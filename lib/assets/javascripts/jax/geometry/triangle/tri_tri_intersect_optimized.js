(function() {
  var bufs;
  if (typeof(bufs) == 'undefined') // in case it was defined elsewhere
    bufs = {};

  

  

  

  /* sort so that a<=b */
  

  


  


  /* this edge to edge test is based on Franlin Antonio's gem:
     "Faster Line Segment Intersection", in Graphics Gems III,
     pp. 199-202 */ 
  

  

  

  function coplanar_tri_tri(N, V0, V1, V2, U0, U1, U2) {
    var A = bufs.tritri_A = bufs.tritri_A || vec3.create();
    var i0, i1;

    /* first project onto an axis-aligned plane, that maximizes the area */
    /* of the triangles, compute indices: i0,i1. */
    A[0] = Math.abs(N[0]);
    A[1] = Math.abs(N[1]);
    A[2] = Math.abs(N[2]);

    if(A[0]>A[1])
    {
      if(A[0]>A[2])  
      {
        i0=1;      /* A[0] is greatest */
        i1=2;
      }
      else
      {
        i0=0;      /* A[2] is greatest */
        i1=1;
      }
    }
    else   /* A[0]<=A[1] */
    {
      if(A[2]>A[1])
      {
        i0=0;      /* A[2] is greatest */
        i1=1;                                           
      }
      else
      {
        i0=0;      /* A[1] is greatest */
        i1=2;
      }
    }               
                
    /* test all edges of triangle 1 against the edges of triangle 2 */
    /* (inline function EDGE_AGAINST_TRI_EDGES) */

    {
      var Ax,Ay,Bx,By,Cx,Cy,e,d,f;
      Ax=V1[i0]-V0[i0];
      Ay=V1[i1]-V0[i1];
      /* test edge U0,U1 against V0,V1 */
      /* (inline function EDGE_EDGE_TEST) */

    Bx=U0[i0]-U1[i0];
    By=U0[i1]-U1[i1];
    Cx=V0[i0]-U0[i0];
    Cy=V0[i1]-U0[i1];
    f=Ay*Bx-Ax*By;
    d=By*Cx-Bx*Cy;
    if((f>0 && d>=0 && d<=f) || (f<0 && d<=0 && d>=f))
    {
      e=Ax*Cy-Ay*Cx;
      if(f>0)
      {
        if(e>=0 && e<=f) return true;
      }
      else
      {
        if(e<=0 && e>=f) return true;
      }
    }                                
  
      /* test edge U1,U2 against V0,V1 */
      /* (inline function EDGE_EDGE_TEST) */

    Bx=U1[i0]-U2[i0];
    By=U1[i1]-U2[i1];
    Cx=V0[i0]-U1[i0];
    Cy=V0[i1]-U1[i1];
    f=Ay*Bx-Ax*By;
    d=By*Cx-Bx*Cy;
    if((f>0 && d>=0 && d<=f) || (f<0 && d<=0 && d>=f))
    {
      e=Ax*Cy-Ay*Cx;
      if(f>0)
      {
        if(e>=0 && e<=f) return true;
      }
      else
      {
        if(e<=0 && e>=f) return true;
      }
    }                                
  
      /* test edge U2,U1 against V0,V1 */
      /* (inline function EDGE_EDGE_TEST) */

    Bx=U2[i0]-U0[i0];
    By=U2[i1]-U0[i1];
    Cx=V0[i0]-U2[i0];
    Cy=V0[i1]-U2[i1];
    f=Ay*Bx-Ax*By;
    d=By*Cx-Bx*Cy;
    if((f>0 && d>=0 && d<=f) || (f<0 && d<=0 && d>=f))
    {
      e=Ax*Cy-Ay*Cx;
      if(f>0)
      {
        if(e>=0 && e<=f) return true;
      }
      else
      {
        if(e<=0 && e>=f) return true;
      }
    }                                
  
    }
  
    /* (inline function EDGE_AGAINST_TRI_EDGES) */

    {
      var Ax,Ay,Bx,By,Cx,Cy,e,d,f;
      Ax=V2[i0]-V1[i0];
      Ay=V2[i1]-V1[i1];
      /* test edge U0,U1 against V1,V2 */
      /* (inline function EDGE_EDGE_TEST) */

    Bx=U0[i0]-U1[i0];
    By=U0[i1]-U1[i1];
    Cx=V1[i0]-U0[i0];
    Cy=V1[i1]-U0[i1];
    f=Ay*Bx-Ax*By;
    d=By*Cx-Bx*Cy;
    if((f>0 && d>=0 && d<=f) || (f<0 && d<=0 && d>=f))
    {
      e=Ax*Cy-Ay*Cx;
      if(f>0)
      {
        if(e>=0 && e<=f) return true;
      }
      else
      {
        if(e<=0 && e>=f) return true;
      }
    }                                
  
      /* test edge U1,U2 against V1,V2 */
      /* (inline function EDGE_EDGE_TEST) */

    Bx=U1[i0]-U2[i0];
    By=U1[i1]-U2[i1];
    Cx=V1[i0]-U1[i0];
    Cy=V1[i1]-U1[i1];
    f=Ay*Bx-Ax*By;
    d=By*Cx-Bx*Cy;
    if((f>0 && d>=0 && d<=f) || (f<0 && d<=0 && d>=f))
    {
      e=Ax*Cy-Ay*Cx;
      if(f>0)
      {
        if(e>=0 && e<=f) return true;
      }
      else
      {
        if(e<=0 && e>=f) return true;
      }
    }                                
  
      /* test edge U2,U1 against V1,V2 */
      /* (inline function EDGE_EDGE_TEST) */

    Bx=U2[i0]-U0[i0];
    By=U2[i1]-U0[i1];
    Cx=V1[i0]-U2[i0];
    Cy=V1[i1]-U2[i1];
    f=Ay*Bx-Ax*By;
    d=By*Cx-Bx*Cy;
    if((f>0 && d>=0 && d<=f) || (f<0 && d<=0 && d>=f))
    {
      e=Ax*Cy-Ay*Cx;
      if(f>0)
      {
        if(e>=0 && e<=f) return true;
      }
      else
      {
        if(e<=0 && e>=f) return true;
      }
    }                                
  
    }
  
    /* (inline function EDGE_AGAINST_TRI_EDGES) */

    {
      var Ax,Ay,Bx,By,Cx,Cy,e,d,f;
      Ax=V0[i0]-V2[i0];
      Ay=V0[i1]-V2[i1];
      /* test edge U0,U1 against V2,V0 */
      /* (inline function EDGE_EDGE_TEST) */

    Bx=U0[i0]-U1[i0];
    By=U0[i1]-U1[i1];
    Cx=V2[i0]-U0[i0];
    Cy=V2[i1]-U0[i1];
    f=Ay*Bx-Ax*By;
    d=By*Cx-Bx*Cy;
    if((f>0 && d>=0 && d<=f) || (f<0 && d<=0 && d>=f))
    {
      e=Ax*Cy-Ay*Cx;
      if(f>0)
      {
        if(e>=0 && e<=f) return true;
      }
      else
      {
        if(e<=0 && e>=f) return true;
      }
    }                                
  
      /* test edge U1,U2 against V2,V0 */
      /* (inline function EDGE_EDGE_TEST) */

    Bx=U1[i0]-U2[i0];
    By=U1[i1]-U2[i1];
    Cx=V2[i0]-U1[i0];
    Cy=V2[i1]-U1[i1];
    f=Ay*Bx-Ax*By;
    d=By*Cx-Bx*Cy;
    if((f>0 && d>=0 && d<=f) || (f<0 && d<=0 && d>=f))
    {
      e=Ax*Cy-Ay*Cx;
      if(f>0)
      {
        if(e>=0 && e<=f) return true;
      }
      else
      {
        if(e<=0 && e>=f) return true;
      }
    }                                
  
      /* test edge U2,U1 against V2,V0 */
      /* (inline function EDGE_EDGE_TEST) */

    Bx=U2[i0]-U0[i0];
    By=U2[i1]-U0[i1];
    Cx=V2[i0]-U2[i0];
    Cy=V2[i1]-U2[i1];
    f=Ay*Bx-Ax*By;
    d=By*Cx-Bx*Cy;
    if((f>0 && d>=0 && d<=f) || (f<0 && d<=0 && d>=f))
    {
      e=Ax*Cy-Ay*Cx;
      if(f>0)
      {
        if(e>=0 && e<=f) return true;
      }
      else
      {
        if(e<=0 && e>=f) return true;
      }
    }                                
  
    }
  
              
    /* finally, test if tri1 is totally contained in tri2 or vice versa */
    /* (inline function POINT_IN_TRI) */

    {
      var a,b,c,d0,d1,d2;
      /* is T1 completly inside T2? */
      /* check if V0 is inside tri(U0,U1,U2) */
      a=U1[i1]-U0[i1];
      b=-(U1[i0]-U0[i0]);
      c=-a*U0[i0]-b*U0[i1];
      d0=a*V0[i0]+b*V0[i1]+c;
      a=U2[i1]-U1[i1];
      b=-(U2[i0]-U1[i0]);
      c=-a*U1[i0]-b*U1[i1];
      d1=a*V0[i0]+b*V0[i1]+c;
      a=U0[i1]-U2[i1];
      b=-(U0[i0]-U2[i0]);
      c=-a*U2[i0]-b*U2[i1];
      d2=a*V0[i0]+b*V0[i1]+c;
      if(d0*d1>0.0)
      {
        if(d0*d2>0.0) return true;
      }
    }
  
    /* (inline function POINT_IN_TRI) */

    {
      var a,b,c,d0,d1,d2;
      /* is T1 completly inside T2? */
      /* check if U0 is inside tri(V0,V1,V2) */
      a=V1[i1]-V0[i1];
      b=-(V1[i0]-V0[i0]);
      c=-a*V0[i0]-b*V0[i1];
      d0=a*U0[i0]+b*U0[i1]+c;
      a=V2[i1]-V1[i1];
      b=-(V2[i0]-V1[i0]);
      c=-a*V1[i0]-b*V1[i1];
      d1=a*U0[i0]+b*U0[i1]+c;
      a=V0[i1]-V2[i1];
      b=-(V0[i0]-V2[i0]);
      c=-a*V2[i0]-b*V2[i1];
      d2=a*U0[i0]+b*U0[i1]+c;
      if(d0*d1>0.0)
      {
        if(d0*d2>0.0) return true;
      }
    }
  

    return false;
  }

  Jax.Geometry.Triangle.tri_tri_intersect = function(V0, V1, V2, U0, U1, U2)
  {
    var E1 = bufs.tritri_E1 = bufs.tritri_E1 || vec3.create(),
        E2 = bufs.tritri_E2 = bufs.tritri_E2 || vec3.create(),
        N1 = bufs.tritri_N1 = bufs.tritri_N1 || vec3.create(),
        N2 = bufs.tritri_N2 = bufs.tritri_N2 || vec3.create(),
        D  = bufs.tritri_D  = bufs.tritri_D  || vec3.create(),
        isect1 = bufs.tritri_isect1 = bufs.tritri_isect1 || vec2.create(),
        isect2 = bufs.tritri_isect2 = bufs.tritri_isect2 || vec2.create();
    var d1, d2;
    var du0,du1,du2,dv0,dv1,dv2;
    var du0du1,du0du2,dv0dv1,dv0dv2;
    var index;
    var vp0,vp1,vp2;
    var up0,up1,up2;
    var b,c,max;

    /* compute plane equation of triangle(V0,V1,V2) */
    vec3.subtract(V1, V0, E1);
    vec3.subtract(V2, V0, E2);
    vec3.cross(E1, E2, N1);
    d1 = -vec3.dot(N1, V0);
    /* plane equation 1: N1.X+d1=0 */

    /* put U0,U1,U2 into plane equation 1 to compute signed distances to the plane*/
    du0 = vec3.dot(N1, U0) + d1;
    du1 = vec3.dot(N1, U1) + d1;
    du2 = vec3.dot(N1, U2) + d1;

    /* coplanarity robustness check */
    if(Math.abs(du0) < Math.EPSILON) du0 = 0.0;
    if(Math.abs(du1) < Math.EPSILON) du1 = 0.0;
    if(Math.abs(du2) < Math.EPSILON) du2 = 0.0;

    du0du1 = du0 * du1;
    du0du2 = du0 * du2;

    if(du0du1 > 0 && du0du2 > 0) /* same sign on all of them + not equal 0 ? */
      return false;              /* no intersection occurs */

    /* compute plane of triangle (U0,U1,U2) */
    vec3.subtract(U1, U0, E1);
    vec3.subtract(U2, U0, E2);
    vec3.cross(E1, E2, N2);
    d2 = -vec3.dot(N2, U0);
    /* plane equation 2: N2.X+d2=0 */

    /* put V0,V1,V2 into plane equation 2 */
    dv0 = vec3.dot(N2, V0) + d2;
    dv1 = vec3.dot(N2, V1) + d2;
    dv2 = vec3.dot(N2, V2) + d2;

    if (Math.abs(dv0) < Math.EPSILON) dv0 = 0;
    if (Math.abs(dv1) < Math.EPSILON) dv1 = 0;
    if (Math.abs(dv2) < Math.EPSILON) dv2 = 0;

    dv0dv1 = dv0 * dv1;
    dv0dv2 = dv0 * dv2;
        
    if(dv0dv1 > 0 && dv0dv2 > 0) /* same sign on all of them + not equal 0 ? */
      return false;              /* no intersection occurs */

    /* compute direction of intersection line */
    vec3.cross(N1, N2, D);

    /* compute and index to the largest component of D */
    max = Math.abs(D[0]);
    index = 0;
    b = Math.abs(D[1]);
    c = Math.abs(D[2]);

    if (b > max) { max = b; index = 1; }
    if (c > max) { max = c; index = 2; }

    /* this is the simplified projection onto L*/
    vp0 = V0[index];
    vp1 = V1[index];
    vp2 = V2[index];

    up0 = U0[index];
    up1 = U1[index];
    up2 = U2[index];

    try {
      /* compute interval for triangle 1 */
      /* (inline function COMPUTE_INTERVALS) */

    if(dv0dv1>0.0)
    {
      /* here we know that dv0dv2<=0.0 */
      /* that is dv0, dv1 are on the same side, dv2 on the other or on the plane */
      /* (inline function ISECT) */

    isect1[0]=vp2+(vp0-vp2)*dv2/(dv2-dv0);
    isect1[1]=vp2+(vp1-vp2)*dv2/(dv2-dv1);
  
    }
    else if(dv0dv2>0.0)
    {
      /* here we know that d0d1<=0.0 */
      /* (inline function ISECT) */

    isect1[0]=vp1+(vp0-vp1)*dv1/(dv1-dv0);
    isect1[1]=vp1+(vp2-vp1)*dv1/(dv1-dv2);
  
    }
    else if(dv1*dv2>0.0 || dv0!=0.0)
    {
      /* here we know that d0d1<=0.0 or that dv0!=0.0 */
      /* (inline function ISECT) */

    isect1[0]=vp0+(vp1-vp0)*dv0/(dv0-dv1);
    isect1[1]=vp0+(vp2-vp0)*dv0/(dv0-dv2);
  
    }
    else if(dv1!=0.0)
    {
      /* (inline function ISECT) */

    isect1[0]=vp1+(vp0-vp1)*dv1/(dv1-dv0);
    isect1[1]=vp1+(vp2-vp1)*dv1/(dv1-dv2);
  
    }
    else if(dv2!=0.0)
    {
      /* (inline function ISECT) */

    isect1[0]=vp2+(vp0-vp2)*dv2/(dv2-dv0);
    isect1[1]=vp2+(vp1-vp2)*dv2/(dv2-dv1);
  
    }
    else
    {
      /* triangles are coplanar */
      return coplanar_tri_tri(N1,V0,V1,V2,U0,U1,U2);
    }
  

      /* compute interval for triangle 2 */
      /* (inline function COMPUTE_INTERVALS) */

    if(du0du1>0.0)
    {
      /* here we know that du0du2<=0.0 */
      /* that is du0, du1 are on the same side, du2 on the other or on the plane */
      /* (inline function ISECT) */

    isect2[0]=up2+(up0-up2)*du2/(du2-du0);
    isect2[1]=up2+(up1-up2)*du2/(du2-du1);
  
    }
    else if(du0du2>0.0)
    {
      /* here we know that d0d1<=0.0 */
      /* (inline function ISECT) */

    isect2[0]=up1+(up0-up1)*du1/(du1-du0);
    isect2[1]=up1+(up2-up1)*du1/(du1-du2);
  
    }
    else if(du1*du2>0.0 || du0!=0.0)
    {
      /* here we know that d0d1<=0.0 or that du0!=0.0 */
      /* (inline function ISECT) */

    isect2[0]=up0+(up1-up0)*du0/(du0-du1);
    isect2[1]=up0+(up2-up0)*du0/(du0-du2);
  
    }
    else if(du1!=0.0)
    {
      /* (inline function ISECT) */

    isect2[0]=up1+(up0-up1)*du1/(du1-du0);
    isect2[1]=up1+(up2-up1)*du1/(du1-du2);
  
    }
    else if(du2!=0.0)
    {
      /* (inline function ISECT) */

    isect2[0]=up2+(up0-up2)*du2/(du2-du0);
    isect2[1]=up2+(up1-up2)*du2/(du2-du1);
  
    }
    else
    {
      /* triangles are coplanar */
      return coplanar_tri_tri(N1,V0,V1,V2,U0,U1,U2);
    }
  
    } catch(e) {
      if (e == 1) return coplanar_tri_tri(N1, V0, V1, V2, U0, U1, U2);
      throw e;
    }

    /* (inline function SORT) */

    if(isect1[0]> isect1[1])
    {
      var c;
      c=isect1[0];
      isect1[0]= isect1[1];
       isect1[1]=c;
    }
  
    /* (inline function SORT) */

    if(isect2[0]> isect1[1])
    {
      var c;
      c=isect2[0];
      isect2[0]= isect1[1];
       isect1[1]=c;
    }
  

    if(isect1[1] < isect2[0] || isect2[1] < isect1[0]) return false;
    return true;
  };
})();
