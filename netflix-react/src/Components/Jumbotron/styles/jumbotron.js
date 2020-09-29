import styled from 'styled-components/macro'

export const Inner = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
max-width:1100px;
margin:auto;
width:100%
flex-direction:${({ direction }) => direction}
@media(max-width:1000px){
    flex-direction:column
}
`
export const Container=styled.div``