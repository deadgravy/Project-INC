import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MachineCards from './MachineCards';

const MachineConnectivity = () => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Typography className='text-xl font-bold pl-2'>Machine Connectivity</Typography>
      </AccordionSummary>
      <AccordionDetails className='row'>
        {/* <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography> */}
        <div className='col-3'>
            <MachineCards />
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default MachineConnectivity;
