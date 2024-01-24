export const GetCurrentDate = () => {
    const CurrDate = new Date().toLocaleString().split(",")[0];
    return CurrDate;
}


export const setMonthName = (num) => {

    if (num == 0) return 'January';
    else if (num == 1) return 'February';
    else if (num == 2) return 'March';
    else if (num == 3) return 'April';
    else if (num == 4) return 'May';
    else if (num == 5) return 'June';
    else if (num == 6) return 'July';
    else if (num == 7) return 'August';
    else if (num == 8) return 'September';
    else if (num == 9) return 'October';
    else if (num == 10) return 'November';
    else if (num == 11) return 'December';

}

export const CompaireTwoDate =(date_1,date_2)=>{
var d1 = new Date(date_1);
var d2 = new Date(date_2);
return d1.getDate() == d2.getDate();
}


/*
January, February, March, April, May, June, July, August, September, October, November and December.
*/