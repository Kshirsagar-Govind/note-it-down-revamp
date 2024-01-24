export const API_URL="https://note-it-down-server.vercel.app";
// export const API_URL="http://localhost:5000";

export const Months=[
	{
        id:0,
		days:31,
		"abbreviation": "Jan",
		"name": "January"
	},
	{
        id:1,
		days:new Date().getFullYear()%4==0?29:28,
		"abbreviation": "Feb",
		"name": "February"
	},
	{
        id:2,
		days:31,
		"abbreviation": "Mar",
		"name": "March"
	},
	{
        id:3,
		days:30,
		"abbreviation": "Apr",
		"name": "April"
	},
	{
        id:4,
		days:31,
		"abbreviation": "May",
		"name": "May"
	},
	{
        id:5,
		days:30,
		"abbreviation": "Jun",
		"name": "June"
	},
	{
        id:6,
		days:31,
		"abbreviation": "Jul",
		"name": "July"
	},
	{
        id:7,
		days:31,
		"abbreviation": "Aug",
		"name": "August"
	},
	{
        id:8,
		days:31,
		"abbreviation": "Sep",
		"name": "September"
	},
	{
        id:9,
		days:30,
		"abbreviation": "Oct",
		"name": "October"
	},
	{
        id:10,
		days:30,
		"abbreviation": "Nov",
		"name": "November"
	},
	{
        id:11,
		days:31,
		"abbreviation": "Dec",
		"name": "December"
	}
]