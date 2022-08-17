import { UsageChart } from '../components/eud/UsageChart';
import React, { useState, useEffect } from 'react';
import SideBar from '../components/sidebar/Sidebar';
import DatePicker from 'react-datepicker';
import '../styles/eud.css';
import 'react-datepicker/dist/react-datepicker.css';
import EUDToggler from '../components/eud/EUDToggler';
import '../styles/toggler.css';
import {
  UsageDetails,
  UsageDetailsForNotUsed,
  UsageDetailsForNotUsedInBtwnDaily,
} from '../components/eud/UsageDetails';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'intro.js/introjs.css';
import { Steps, Hints } from "intro.js-react";

const EquipUtilDashboard = () => {
  const [singleUsage, setSingleUsage] = useState(null);
  const [multipleUsage, setMultipleUsage] = useState(null);
  const [singleDetails, setSingleDetails] = useState(null);
  const [multipleDetails, setMultipleDetails] = useState(null);
  const [singleUnused, setSingleUnused] = useState(null);
  const [multipleUnused, setMultipleUnused] = useState(null);

  const [isLoading, setIsloading] = useState(true);
  const [startDate, setStartDate] = useState(new Date('2021-08-21'));
  const [hour, setHours] = useState('01:00:00');
  const [count, setCount] = useState(1);
  const [buttonState, setButtonState] = useState('toggle-button1'); // for toggler
  let navigate = useNavigate();
  const [stepsEnabled, setStepsEnabled] = useState(false);
  const initialStep = 0;

  //Intro.js
  const steps = [
    {
      element: "#title",
      intro: "test1"
    },
    {
      element: "#datePicker",
      intro: "test2"
    },
    {
      element: "#toggler",
      intro: "test3"
    },
    {
      element: "#singleUsage",
      intro: "test4"
    },
    {
      element: "#multipleUsage",
      intro: "test5"
    },
    {
      element: "#equipUsage",
      intro: "test6"
    },
    {
      element: "#input",
      intro: "test7"
    },
    {
      element: "#singleDetails",
      intro: "test8"
    },
    {
      element: "#multiDetails",
      intro: "test8"
    }
  ];

  const onExit = () => {
    setStepsEnabled(false);
  };

  const toggleSteps = () => {
    setStepsEnabled(true);
  };
  // useEffect
  useEffect(() => {
    setIsloading(true);

    let enddate = moment(moment(startDate, 'YYYY-MM-DD')).format('YYYY-MM-DD');
    let startdate = moment(
      moment(startDate, 'YYYY-MM-DD').subtract(1, 'days')
    ).format('YYYY-MM-DD');

    Promise.all([
      fetch(
        `http://localhost:4000/api/getSingleUsage/${startdate}/${enddate}`
      ).then((res) => res.json()),
      fetch(
        `http://localhost:4000/api/getMultipleUsage/${startdate}/${enddate}`
      ).then((res) => res.json()),
      fetch(
        `http://localhost:4000/api/getSingleUsageDetails/${startdate}/${enddate}/${hour}`
      ).then((res) => res.json()),
      fetch(
        `http://localhost:4000/api/getMultipleUsageDetails/${startdate}/${enddate}/${hour}`
      ).then((res) => res.json()),
      fetch(
        `http://localhost:4000/api/getSingleUnusedDetails/${startdate}/${enddate}/${hour}`
      ).then((res) => res.json()),
      fetch(
        `http://localhost:4000/api/getMultipleUnusedDetails/${startdate}/${enddate}/${hour}`
      ).then((res) => res.json()),
    ]).then(([result1, result2, result3, result4, result5, result6]) => {
      setSingleUsage({
        data: result1.data,
        count: count,
      });
      setMultipleUsage({
        data: result2.data,
      });
      setSingleDetails({
        data: result3.data,
        hour: count,
      });
      setMultipleDetails({
        data: result4.data,
      });
      setSingleUnused({
        data: result5.data,
        date: enddate,
        hour: count,
      });
      setMultipleUnused({
        data: result6.data,
        date: enddate,
        hour: count,
      });
      setSingleUnused({
        data: result5.data,
        date: enddate,
        hour: count,
      });
      setMultipleUnused({
        data: result6.data,
        date: enddate,
        hour: count,
      });

      setIsloading(false);
    });
  }, [startDate, hour, count]);

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

  if (buttonState === 'toggle-button2') {
    navigate('/equipmentUtilisationDashboard/weekly');
  }

  return (
    <React.StrictMode>
      <div className='equipmentuUtilisationDashboard row p-0 w-100p'>
        <Steps
          enabled={stepsEnabled}
          steps={steps}
          initialStep={initialStep}
          onExit={onExit}
        />
        <div className='po-sidebar sidebar col-2'>
          <SideBar />
        </div>
        <div className='po-display col-10'>
          <div className='App'>
            {!isLoading ? (
              <div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                  <div className='pt-2 Row1' id='title'>
                    <h2>Equipment Utilisation Dashboard</h2>
                  </div>
                  <button style={{marginLeft: 20, height: 60, marginTop: 20}} onClick={toggleSteps}>Toggle Steps</button>
                </div>
                <div className='Row2'>
                  <div className='col-2' id='datePicker'>
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
                  <div className='col-9 mr-3 u-flex u-justify-flex-end'>
                    <div id='toggler'>
                    <EUDToggler
                      buttonState={buttonState}
                      setButtonState={setButtonState}
                    />
                    </div>
                  </div>
                </div>
                <div id='singleUsage'>
                  <div className='Row3'>
                    <h3>Single Recipe Equipment</h3>
                  </div>
                  <div className='Row4'>
                    {singleUsage.data.length === 0 ||
                    singleUsage.data.length === undefined ? (
                      <p>NO DATA</p>
                    ) : (
                      <UsageChart data={singleUsage} />
                    )}
                  </div>
                </div>
                <div id='multipleUsage'>
                  <div className='Row5'>
                    <h3>Multiple Recipe Equipment</h3>
                  </div>
                  <div className='Row6'>
                    {singleUsage.data.length === 0 ||
                    singleUsage.data.length === undefined ? (
                      <p>NO DATA</p>
                    ) : (
                      <UsageChart data={multipleUsage} />
                    )}
                  </div>
                </div>
                <div className='row'>
                  <h5 className='col-9' id='equipUsage'>Equipment Usage Details</h5>
                  {/* Start of Input Box code */}
                  <div className='col-2 level-item mr-2'>
                    <input
                      id='input'
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
                      <div className='singleContent mb-4' id='singleDetails'>
                        <h6 id='projectname' className='title mb-1'>
                          Single Recipe Equipment
                        </h6>

                        {singleDetails.data.length === 0 &&
                        singleUnused.data.length === 0 &&
                        singleUnused.data.length === 0 ? (
                          <p>NO DATA</p>
                        ) : (
                          <div>
                            <UsageDetails data={singleDetails} />
                            <UsageDetailsForNotUsed data={singleUnused} />
                            <UsageDetailsForNotUsedInBtwnDaily
                              data={singleUsage}
                            />
                          </div>
                        )}
                      </div>

                      <div className='singleContent mb-4' id='multiDetails'>
                        <h6 id='projectname2' className='title mb-1'>
                          Multiple Recipe Equipment
                        </h6>

                        {multipleDetails.data.length === 0 &&
                        multipleUnused.data.length === 0 ? (
                          <p>NO DATA</p>
                        ) : (
                          <div>
                            <UsageDetails data={multipleDetails} />
                            <UsageDetailsForNotUsed data={multipleUnused} />
                            <UsageDetailsForNotUsedInBtwnDaily
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

export default EquipUtilDashboard;
