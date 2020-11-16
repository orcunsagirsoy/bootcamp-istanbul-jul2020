export function byTitle( a, b ) {
    if ( a.title < b.title ){
      return -1;
    }
    if ( a.title > b.title){
      return 1;
    }
    return 0;
  }
  
export function byTitleD( a, b ) {
if ( a.title < b.title ){
    return 1;
}
if ( a.title > b.title){
    return -1;
}
return 0;
}

export function byDeadline( a, b ) {
if ( a.due < b.due ){
    return -1;
}
if ( a.due > b.due){
    return 1;
}
return 0;
}

export function byDeadlineD( a, b ) {
if ( a.due < b.due ){
    return 1;
}
if ( a.due > b.due){
    return -1;
}
return 0;
}

export function byDate( a, b ) {
    if ( a.date < b.date ){
      return -1;
    }
    if ( a.date > b.date){
      return 1;
    }
    return 0;
  }
  
export function byDateD( a, b ) {
    if ( a.date < b.date ){
      return 1;
    }
    if ( a.date > b.date){
      return -1;
    }
    return 0;
  }