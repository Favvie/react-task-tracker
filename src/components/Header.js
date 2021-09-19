import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = ({ title, onAdd, showAdd }) => {
    const location = useLocation()


    return (
        <header className='header'>
            <h1>{title}</h1>
            {location.pathname === '/' && <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'CLOSE' : 'Add'} onClick={onAdd}/>}
        </header>
    )
}



// you use double curly braces {{}} to add styles to tag
// youccan destructure the props object
// you can create defualt props
// writing the props where the component is called will overwrite the defaultProps
Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title : PropTypes.string,
}

// CSS IN JS
// const headerStyle = {
//     color: 'red', 
//     backgroundColor: 'black'
// }
export default Header
// after creating a component you need to put it into the app 