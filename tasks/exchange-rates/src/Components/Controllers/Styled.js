import styled from 'styled-components'

export const ControllersWrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    `
export const ValuesWap = styled.div`
    display: flex;
    flex-direction: column;
    text-align: right;
    margin-right: 15px;
    & :first-child{
    margin-bottom: 10px;
}
    `
export const CurrenciesWap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: left;
    & > * > *{
    min-height: 40px;
    }
    & > :first-child{
    margin-bottom: 10px;
}
`
