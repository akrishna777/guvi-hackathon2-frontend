import * as React from 'react'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import MovieIcon from '@mui/icons-material/Movie'
import LocalMoviesIcon from '@mui/icons-material/LocalMovies'
import StadiumIcon from '@mui/icons-material/Stadium'
import EventIcon from '@mui/icons-material/Event'
import BookIcon from '@mui/icons-material/Book'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import { NavLink } from 'react-router-dom'

export default function SidebarList() {
  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor:
          'linear-gradient(124deg, rgba(131,58,180,1) 0%, rgba(165,50,138,1) 50%, rgba(170,49,132,1) 75%, rgba(192,44,105,1) 100%);',
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <NavLink to="/" style={{ textDecoration: 'none', color: 'white' }}>
        <ListItemButton>
          <ListItemIcon>
            <MovieIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Movies" />
        </ListItemButton>
      </NavLink>

      <NavLink
        to="/viewmovies"
        style={{ textDecoration: 'none', color: 'white' }}
      >
        <ListItemButton>
          <ListItemIcon>
            <MovieIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="View Movies" />
        </ListItemButton>
      </NavLink>

      <NavLink
        to="/addmovie"
        style={{ textDecoration: 'none', color: 'white' }}
      >
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <LocalMoviesIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Add Movie" />
        </ListItemButton>
      </NavLink>

      <NavLink
        to="/addtheater"
        style={{ textDecoration: 'none', color: 'white' }}
      >
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <StadiumIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Add Theater" />
        </ListItemButton>
      </NavLink>
    </List>
  )
}
