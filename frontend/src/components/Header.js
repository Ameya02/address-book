import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title}) => 
{
  const onClick = () => 
  {
    console.log('Click')
  }
  return (
    <header className='header'>
      
      
      <h1 style = {{color: 'yellow', backgroundColor: 'black'}}>  {title} </h1>
      <Button color= 'Blue' text='Add' onClick = {onClick} />
      
    </header>
  )
}

Header.defaultProps = {
    title: 'Hello!', 
}

Header.propTypes = {
  title: PropTypes.string.isRequired, 
}



export default Header
