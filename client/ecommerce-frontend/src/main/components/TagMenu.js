/**
 * author: akash trivedi
 * date-created: 
 * functionality: 
 * caller-function: 
 * performs-network-request: false
 */

import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Chip, Box
} from '@mui/material'
import ApplicationContext from '../context/ApplicationContext';

function TagChip(props) {
  return (
    <NavLink to={`/tag/${props.tag.tagId}`} key={props.tag.tagId}>
      <Chip sx={{ p: 1, m: 0.5 }} variant="outlined" label={props.tag.tagName} />
    </NavLink>
  );

}
export default function TagMenu() {
  const { appData } = useContext(ApplicationContext)
  return (
    <Box display='flex' alignItems='center' justifyContent='center' flexWrap='wrap' bgcolor='white' sx={{ p: 2 }}>
      {
        appData.tags.map((tag) => {
          return <TagChip tag={tag} key={tag.tagId} />
        })
      }
    </Box>
  )
}
