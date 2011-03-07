require "active_support/core_ext"

module Jax
  class Application
    autoload :Configuration, "jax/application/configuration"
    
    class << self
      def inherited(base)
        raise "You cannot have more than one Jax::Application" if Jax.application
        super
        
        base.called_from = begin
          # Remove the line number from backtraces making sure we don't leave anything behind
          call_stack = caller.map { |p| p.sub(/:\d+.*/, '') }
          File.dirname(call_stack.detect { |p| p !~ %r[jax[\w.-]*/lib/jax] })
        end
        
        Jax.application = base.instance
        Jax.application.config.root ||= Jax.application.find_root_with_flag("app")
      end

      def config
        @config ||= Jax::Application::Configuration.new
      end
      
      def instance
        @instance ||= new
      end
      
      def called_from
        @called_from ||= nil
      end
      
      def called_from=(where)
        @called_from = where
      end
      
    end

    delegate :config, :to => "self.class"
    delegate :root, :to => :config

    def find_root_with_flag(flag, default=nil)
      root_path = self.class.called_from
  
      while root_path && File.directory?(root_path) && !File.exist?("#{root_path}/#{flag}")
        parent = File.dirname(root_path)
        root_path = parent != root_path && parent
      end
  
      root = File.exist?("#{root_path}/#{flag}") ? root_path : default
      raise "Could not find root path for #{self}" unless root
  
      RbConfig::CONFIG['host_os'] =~ /mswin|mingw/ ?
        Pathname.new(root).expand_path : Pathname.new(root).realpath
    end
  end
end