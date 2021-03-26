import { URL_GET_RATES } from '../constants.js'

export async function convertCurrency(props){
    const responseGetRates = await fetch(URL_GET_RATES)
    const dataRates = await responseGetRates.json()
    return {
        USD: dataRates.rates.USD,
        EUR: dataRates.rates.EUR,
        BYN: dataRates.rates.BYN
    }
}
