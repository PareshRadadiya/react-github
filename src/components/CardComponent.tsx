// CardComponent.js
import {Card, Link, Chip, CardContent, Typography} from '@mui/material';
import './UserData.css';

const CardComponent = ({ repoData }:any) => {
  return (
    <Card style={{ margin: '15px', height:'12vh', width:"100%", display: 'inline-flex' }}>
      <CardContent className='cardData'>
        <Typography variant="h5" component="div" color='primary' className='repoName' >
        <Link href={repoData.svn_url} target="_blank" rel="noopener noreferrer">
            {repoData.name}</Link>
            <Chip label="Public" variant="outlined"  className='publicTag'/>
        </Typography>
        {repoData.description && 
        <Typography variant="body2" color="text.secondary" sx={{marginTop:'6px'}}>
          Description: {repoData.description}
        </Typography>
        
        }
        <Typography variant="body2" color="text.secondary" sx={{marginTop:'6px'}}>
          {repoData.language}
        </Typography>
        
      </CardContent>
    </Card>
  );
};

export default CardComponent;