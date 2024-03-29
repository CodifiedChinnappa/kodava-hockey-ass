export function getSvgClassName(pathname) {
    let baseClass = 'text-slate-400';
    if (pathname === '/' || ['products', 'coupons', 'categories', 'banners'].some((substring) => pathname.includes(substring))) {
      baseClass += ' text-indigo-600';
    } else if (pathname === '/' || ['products', 'coupons', 'categories', 'banners'].some((substring) => pathname.includes(substring))) {
      baseClass += ' text-indigo-200';
    }
    return baseClass;
  }
  
  export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }