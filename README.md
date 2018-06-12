# Tivix JS demo

Thanks for checking out my javascript demo, a simple weather app powered by openweathermap.

## Install

`git clone https://github.com/GrantHolcombe/simple-weather.git`

`yarn install`
`yarn start`

If you do not have yarn

`npm install`
`npm start`

This app was created with create-react-app, and as such the above code will spin up a local dev server on http://localhost:3000

## How it works

Enter a US City or State and press the Search button. This will render a five day temperature and humidity forecast with data points every 3 hours. (There were plenty of metrics to render, but I thought that temp and humidity were most important to most people. This app is focused primarily on temperature.)

## Filter temps

You can filter the forecast to show the temperature and humidity with the Min and Max buttons. Min will show you details about the coldest point over the next 5 days along with the humidity. Max will do the inverse and show you the hottest point over the next five days along with humidity.

The Mean button will show you an average temperature for the next five days but will not render a date or humidity, this is because the average is an aggregated value and showing other data points along side did not make sense.

The Mode button rounds all values to whole numbers and then returns the most frequently occuring temperature. I did this because with 2 decimals of precision from the API, most data points were rather unique. I feel that rounding gave a better result of the most repeated temperature, humans hardly notice less than a degree of ambient temperature anyway.

If you would like to show all data again after filtering, simply press search again.

## Thank you!

Thanks for checking out my project. I hope you enjoyed it and I look forward to hearing feedback!
