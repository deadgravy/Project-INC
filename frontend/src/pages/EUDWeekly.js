import React, { useState, useEffect } from 'react';
import SideBar from '../components/sidebar/Sidebar';
import DatePicker from 'react-datepicker';
import '../styles/eud.css';
import 'react-datepicker/dist/react-datepicker.css';
import Toggler from '../components/general/Toggler';
import '../styles/toggler.css';
import { WeeklyChart } from '../components/eud/weeklyChart';
import {
  UsageDetailsForNotUsedInBtwn,
  UsageDetailsForNotUsedWeekly,
  WeeklyDetails,
} from '../components/eud/UsageDetails';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const EUDWeekly = () => {
  const [singleUsage, setSingleUsage] = useState(null);
  const [multipleUsage, setMultipleUsage] = useState(null);
  const [singleDetails, setSingleDetails] = useState(null);
  const [multipleDetails, setMultipleDetails] = useState(null);
  const [singleUnused, setSingleUnused] = useState(null);
  const [multipleUnused, setMultipleUnused] = useState(null);
  const [singleUnused, setSingleUnused] = useState(null);
  const [multipleUnused, setMultipleUnused] = useState(null);

  const [isLoading, setIsloading] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [hour, setHours] = useState('01:00:00');
  const [count, setCount] = useState(1);
  const [buttonState, setButtonState] = useState('toggle-button2'); // for toggler
  let navigate = useNavigate();

  // useEffect
  useEffect(() => {
    setIsloading(true);

    let startdate = moment(moment(startDate, 'YYYY-MM-DD')).format(
      'YYYY-MM-DD'
    );
    let enddate = moment(moment(startDate, 'YYYY-MM-DD').add(6, 'days')).format(
      'YYYY-MM-DD'
    );

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
      fetch(
        `http://localhost:4000/api/getSingleUnusedWeekly/${startdate}/${enddate}/${hour}`
      ).then((res) => res.json()),
      fetch(
        `http://localhost:4000/api/getMultipleUnusedWeekly/${startdate}/${enddate}/${hour}`
      ).then((res) => res.json()),
      fetch(
        `http://localhost:4000/api/getSingleUnusedWeekly/${startdate}/${enddate}/${hour}`
      ).then((res) => res.json()),
      fetch(
        `http://localhost:4000/api/getMultipleUnusedWeekly/${startdate}/${enddate}/${hour}`
      ).then((res) => res.json()),
    ]).then(
      ([
        result1,
        result2,
        result3,
        result4,
        result5,
        result6,
        result5,
        result6,
      ]) => {
        setSingleUsage({
          data: result1.data,
          count: count,
          count: count,
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
        setSingleUnused({
          data: result5.data,
          hour: count,
        });
        setMultipleUnused({
          data: result6.data,
          hour: count,
        });
        setSingleUnused({
          data: result5.data,
          hour: count,
        });
        setMultipleUnused({
          data: result6.data,
          hour: count,
        });

        setIsloading(false);
      }
    );
  }, [startDate, hour, count, count]);

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

  if (buttonState === 'toggle-button1') {
    navigate('/equipmentUtilisationDashboard');
  }

  if (buttonState === 'toggle-button1') {
    navigate('/equipmentUtilisationDashboard');
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
                      maxDate={new Date()}
                      showYearDropdown
                      dateFormatCalendar='MMMM'
                      yearDropdownItemNumber={15}
                      scrollableYearDropdown
                    />
                  </div>
                  <div className='col-10 mr-3 u-flex u-justify-flex-end'>
                    <Toggler
                      buttonState={buttonState}
                      setButtonState={setButtonState}
                      buttonState={buttonState}
                      setButtonState={setButtonState}
                    />
                  </div>
                </div>
                <div className='Row3'>
                  <h3>Single Recipe Equipment</h3>
                </div>
                <div className='Row4'>
                  {singleUsage.data.length === 0 ||
                  singleUsage.data.length === undefined ? (
                    <p>NO DATA</p>
                  ) : (
                    <WeeklyChart data={singleUsage} />
                  )}
                </div>
                <div className='Row5'>
                  <h3>Multiple Recipe Equipment</h3>
                </div>
                <div className='Row6'>
                  {multipleUsage.data.length === 0 ||
                  multipleUsage.data.length === undefined ? (
                    <p>NO DATA</p>
                  ) : (
                    <WeeklyChart data={multipleUsage} />
                  )}
                </div>
                <div className='row mt-4'>
                  <h3 className='col-9'>Equipment Usage Details</h3>
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
                        <h5 id='projectname' className='title mb-0'>
                          Single Recipe Equipment
                        </h5>
                        {singleDetails.data.length === 0 ? (
                          <p>NO DATA</p>
                        ) : (
                          <div>
                            <WeeklyDetails data={singleDetails} />
                            <br></br>
                            <UsageDetailsForNotUsedWeekly data={singleUnused} />
                            <UsageDetailsForNotUsedInBtwn data={singleUsage} />
                          </div>
                        )}
                      </div>

                      <div className='singleContent mb-4'>
                        <h5 id='projectname2' className='title mb-0'>
                          Multiple Recipe Equipment
                        </h5>
                        {multipleDetails.data.length === 0 ? (
                          <p>NO DATA</p>
                        ) : (
                          <div>
                            <WeeklyDetails data={multipleDetails} />
                            <br></br>
                            <UsageDetailsForNotUsedWeekly
                              data={multipleUnused}
                            />
                            <UsageDetailsForNotUsedInBtwn
                              data={multipleUsage}
                            />
                          </div>
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
