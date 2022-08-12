import React, { useState, useEffect } from 'react';
import SideBar from '../components/sidebar/Sidebar';
import DatePicker from 'react-datepicker';
import '../styles/eud.css';
import 'react-datepicker/dist/react-datepicker.css';
import Toggler from '../components/general/Toggler';
import '../styles/toggler.css';
import { WeeklyChart } from '../components/eud/weeklyChart';
import { MREWeeklyChart } from '../components/eud/MREWeeklyChart';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { WeeklyDetails } from '../components/eud/UsageDetails';

const EUDWeekly = () => {
  const [singleUsage, setSingleUsage] = useState(null);
  const [multipleUsage, setMultipleUsage] = useState(null);
  const [singleDetails, setSingleDetails] = useState(null);
  const [multipleDetails, setMultipleDetails] = useState(null);

  const [isLoading, setIsloading] = useState(true);
  const [startDate, setStartDate] = useState(new Date('2021-08-10'));
  const [hour, setHours] = useState('01:00:00');
  const [count, setCount] = useState(1);

  // useEffect
  useEffect(() => {
    setIsloading(true);

    var dd = String(startDate.getDate()).padStart(2, '0');
    var mm = String(startDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = startDate.getFullYear();

    let startdate = yyyy + '-' + mm + '-' + dd;
    let enddate = `${yyyy}-${mm}-${parseInt(dd) + 7}`;

    Promise.all([
      fetch(
        `http://localhost:4000/api/getSingleUsageWeekly/${startdate}/${enddate}`
      ).then((res) => res.json()),
      fetch(
        `http://localhost:4000/api/getMultipleUsageWeekly/${startdate}/${enddate}`
      ).then((res) => res.json()),
      fetch(
        `http://localhost:4000/api/getSingleUsageDetailsWeekly/${startdate}/${enddate}/${hour}`
      ).then((res) => res.json()),
      fetch(
        `http://localhost:4000/api/getMultipleUsageDetailsWeekly/${startdate}/${enddate}/${hour}`
      ).then((res) => res.json()),
    ]).then(([result1, result2, result3, result4]) => {
      setSingleUsage({
        data: result1.data,
      });
      setMultipleUsage({
        data: result2.data,
      });
      setSingleDetails({
        data: result3.data,
      });
      setMultipleDetails({
        data: result4.data,
      });

      setIsloading(false);
    });
  }, [startDate, hour]);

  function handleHours(hourinput) {
    setCount(hourinput);
    if (hourinput.length === 1) {
      hourinput = `0${hourinput}:00:00`;
    } else if (hourinput.length === 2) {
      hourinput = `${hourinput}:00:00`;
    }
    console.log(hourinput);
    setHours(hourinput);
  }

  return (
    <React.StrictMode>
      <div className='equipmentuUtilisationDashboard row p-0 w-100p'>
        <div className='po-sidebar sidebar col-2'>
          <SideBar />
        </div>
        <div className='po-display col-10'>
          <div className='App'>
            {!isLoading ? (
              <div>
                <div className='pt-2 Row1'>
                  <h2>Equipment Utilisation Dashboard</h2>
                </div>
                <div className='Row2'>
                  <div className='col-2'>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      minDate={new Date('2021-08-10')}
                      maxDate={new Date('2021-08-22')}
                      showYearDropdown
                      dateFormatCalendar='MMMM'
                      yearDropdownItemNumber={15}
                      scrollableYearDropdown
                    />
                  </div>
                  <div className='col-10 mr-3 u-flex u-justify-flex-end'>
                    <Toggler />
                  </div>
                </div>
                <div className='Row3'>
                  <h3>Single Recipe Equipment</h3>
                </div>
                <div className='Row4'>
                  <WeeklyChart data={singleUsage} />
                </div>
                <div className='Row5'>
                  <h3>Multiple Recipe Equipment</h3>
                </div>
                <div className='Row6'>
                  <MREWeeklyChart data={multipleUsage} />
                </div>
                <div className='row'>
                  <h5 className='col-9'>Equipment Usage Details</h5>
                  {/* Start of Input Box code */}
                  <div className='col-2 level-item mr-2'>
                    <input
                      type='number'
                      min='1'
                      max='24'
                      value={count}
                      onChange={(e) => handleHours(e.target.value)}
                    />
                  </div>
                  {/* End of Input Box code */}
                </div>
                <div className='Row8'>
                  <div className='card mr-6'>
                    <div className='content pt-2 px-3'>
                      <div className='singleContent mb-4'>
                        <h6 id='projectname' className='title mb-0'>
                          Single Recipe Equipment
                        </h6>
                        <WeeklyDetails data={singleDetails} />
                      </div>

                      <div className='singleContent mb-4'>
                        <h6 id='projectname2' className='title mb-0'>
                          Multiple Recipe Equipment
                        </h6>
                        {multipleDetails.length === 0 ? (
                          <p>NO DATA</p>
                        ) : (
                          <WeeklyDetails data={multipleDetails} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div> Loading... </div> // TODO: Loading loading spinner or loading component
            )}
          </div>
        </div>
      </div>
    </React.StrictMode>
  );
};

export default EUDWeekly;
