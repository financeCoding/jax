require 'active_support/core_ext'

module Jax
  module Generators
    module Model
      class ModelGenerator < Thor::Group
        include Thor::Actions
        argument :model_name

        def self.source_root
          File.expand_path("templates", File.dirname(__FILE__))
        end
        
        def source
          template 'model.js.tt', File.join("app/models", "#{file_name}.js")
        end
        
        def test
          template 'test.js.tt', File.join('spec/javascripts/models', "#{file_name}_spec.js")
        end
        
        def resources
          empty_directory File.join("app", "resources", plural_name)
        end
        
        protected
        def self.banner
          "jax generate model #{self.arguments.map { |a| a.usage }.join(' ')}"
        end

        def file_name
          model_name.underscore
        end
        
        def class_name
          model_name.camelize
        end
        
        def plural_name
          model_name.pluralize
        end
      end
    end
  end
end
