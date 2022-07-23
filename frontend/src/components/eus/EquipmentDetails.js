import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Toggler from './Toggler';

const EquipmentDetails = () => {
    return (
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography className='text-xl font-bold pl-2'>
            Equipment Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails className='row py-2'>
            <Toggler />
        </AccordionDetails>
      </Accordion>
    )
}

export default EquipmentDetails;