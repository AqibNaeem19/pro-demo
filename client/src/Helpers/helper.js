const addressShortner = ( address ) => {
  const firstLetters = address.slice(0,6);
  const lastLetters = address.slice(-6);
  const shortenedAddress = firstLetters + '......' + lastLetters;
  return shortenedAddress;
}

const convertDate = ( unix ) => {
  let date = new Date(unix * 1000);
  return date.toLocaleDateString()
}

const UnixToDate = (unix) => {
  let date = new Date(unix * 1000);
  console.log('i am date', date)
  return date;
}

const convertHexToDecimal = ( value ) => {
  return parseInt(value, 16);
}


const projectStatus = ( statusNumber ) => {
  switch(statusNumber){
    case 0:
      return 'Open';
    case 1:
      return 'Approved';
    case 2: 
      return 'Reverted';
    case 3:
      return 'Deleted';
    case 4:
      return 'Paidout'
  }
}

export {
  addressShortner,
  convertDate,
  convertHexToDecimal,
  UnixToDate,
  projectStatus
}