import React from 'react'
import styles from './Navbar.module.css'
import { Avatar, AvatarBadge ,Popover,PopoverTrigger ,PopoverContent} from '@chakra-ui/react'
const Navbar = () => {
  return (
    <header className={styles.header} >
      <div className={styles.logo}>
        Dash<span>board</span>
      </div>
      <div className={ styles.nav}>
      <Popover>
  <PopoverTrigger>
  <Avatar name="Arvind kumar"  size={"sm"} >
    <AvatarBadge boxSize='1.25em' bg='green.500' />
  </Avatar>
  </PopoverTrigger>
  <PopoverContent width='150px' 
  bg='#181818'
  textAlign='center'
  top={'3px'}
   color='white' border='none' >
    <span>Logout</span>
  </PopoverContent>
</Popover>
      </div>
      
    </header>
  )
}

export default Navbar