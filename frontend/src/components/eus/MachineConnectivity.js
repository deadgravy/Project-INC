import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MachineCards from './MachineCards';

const MachineConnectivity = (props) => {
  const machinesData = props.data.data;
  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Typography className='text-xl font-bold pl-2'>
          Machine Connectivity
        </Typography>
      </AccordionSummary>
      <AccordionDetails className='row py-2' id="cards">
        {machinesData.map((item, count) => {
          return (
            <div className='col-4' key={count}>
              <MachineCards data={item}/>
            </div>
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
};

export default MachineConnectivity;
