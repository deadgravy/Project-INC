import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export function UsageDetails(data) {
  let data1 = data.data.data;
  let hours = data.data.hour;
  return (
    <>
      {data1.length === 0 ? (
        <div className='usageDetails'>
          <ErrorOutlineIcon />
          <p className='ml-1'>
            {' '}
            <b>None of the equipment were used for more than {hours} hours.</b>
          </p>
        </div>
      ) : (
        data1.map((data) => (
          <div className='usageDetails'>
            <ErrorOutlineIcon />
            <span key={data.toString()} className='ml-1'>
              <b>{data.equipment}</b> was used for {data.duration.hours}:
              {data.duration.minutes}:{data.duration.seconds} producing{' '}
              <b>{data.recipe}</b>.
            </span>
          </div>
        ))
      )}
    </>
  );
}

export function WeeklyDetails(data) {
  let data1 = data.data.data;

  return (
    <>
      {data1.map((data) => (
        <div className='usageDetails'>
          <ErrorOutlineIcon />
          <span key={data.toString()} className='ml-1'>
            <b>{data.equipment}</b> was used for {data.duration.hours}:
            {data.duration.minutes}:{data.duration.seconds} producing{' '}
            <b>{data.recipe}</b> on{' '}
            <b>
              {data.date}, {data.day}
            </b>
            .
          </span>
        </div>
      ))}
    </>
  );
}

export function UsageDetailsForNotUsed(data) {
  let data1 = data.data.data;
  let date = data.data.date;
  let hours = data.data.hour;

  let detailsArr = [];

  for (var i = 0; i < data1.length; i++) {
    let x = i - 1;
    if (i === 0 || data1[i].equipment !== data1[x]?.equipment) {
      detailsArr.push({
        equipment: data1[i].equipment,
        recipe: data1[i].recipe,
        duration: data1[i].difference,
        date: date,
      });
    }
  }
  console.log(detailsArr);

  return (
    <>
      {detailsArr.length === 0 ? (
        <div className='usageDetails'>
          <WarningAmberIcon style={{ fill: 'red' }} />
          <span key={data.toString()} className='ml-1'>
            None of the equipment were <b>left unused</b> for more than {hours}{' '}
            hours.
          </span>
        </div>
      ) : (
        detailsArr.map((data) => (
          <div className='usageDetails'>
            <WarningAmberIcon style={{ fill: 'red' }} />
            <span key={data.toString()} className='ml-1'>
              <b>{data.equipment}</b> was not used for {data.duration.hours}:
              {data.duration.minutes}:{data.duration.seconds} from{' '}
              <b>{data.date} 12AM</b>
            </span>
          </div>
        ))
      )}
    </>
  );
}

export function UsageDetailsForNotUsedWeekly(data) {
  let data1 = data.data.data;
  let hours = data.data.hour;

  let detailsArr = [];

  for (var i = 0; i < data1.length; i++) {
    let x = i - 1;
    if (i === 0 || data1[i].equipment !== data1[x]?.equipment) {
      detailsArr.push({
        equipment: data1[i].equipment,
        duration: data1[i].difference,
        day: data1[i].day,
        date: data1[i].date,
      });
    }
  }
  console.log(detailsArr);

  return (
    <>
      {detailsArr.length === 0 ? (
        <div className='usageDetails'>
          <WarningAmberIcon style={{ fill: 'red' }} />
          <span key={data.toString()} className='ml-1'>
            None of the equipment were <b>left unused</b> for more than {hours}{' '}
            hours.
          </span>
        </div>
      ) : (
        detailsArr.map((data) => (
          <div className='usageDetails'>
            <WarningAmberIcon style={{ fill: 'red' }} />
            <span key={data.toString()} className='ml-1'>
              <b>{data.equipment}</b> was not used for {data.duration.hours}:
              {data.duration.minutes}:{data.duration.seconds} from{' '}
              <b>
                {data.date}, {data.day} 12AM
              </b>
            </span>
          </div>
        ))
      )}
    </>
  );
}

export function UsageDetailsForNotUsedInBtwn(data) {
  let data1 = data.data.data;
  let count = data.data.count;
  console.log(data1);

  let detailsArr = [];

  for (var i = 0; i < data1.length; i++) {
    let x = i - 1;
    // comparing if equipment have same name
    if (data1[i].equipment === data1[x]?.equipment) {
      //if have, want to get the duration in btwn that equipment was not used
      // convert 1st equipment's end time and 2nd equipment start time to ms
      let date1 = new Date(data1[x].end_time);
      let date2 = new Date(data1[i].start_time);
      let firstInMs = date1.getTime();
      let secondInMs = date2.getTime();

      // gets difference in ms
      let difference = secondInMs - firstInMs;

      // converts ms to hh:mm:ss
      // 1- Convert to seconds:
      let seconds = difference / 1000;
      // 2- Extract hours:
      let hours = parseInt(seconds / 3600); // 3,600 seconds in 1 hour
      seconds = seconds % 3600; // seconds remaining after extracting hours
      // 3- Extract minutes:
      let minutes = parseInt(seconds / 60); // 60 seconds in 1 minute
      // 4- Keep only seconds not extracted to minutes:
      seconds = seconds % 60;

      for (var y = 0; y < 3; y++) {
        if (hours === '0') {
          hours = `00`;
        } else if (minutes === '0') {
          minutes = `00`;
        } else if (seconds === '0') {
          seconds = `00`;
        } else if (hours.toString().length === 1) {
          hours = `0${hours}`;
        } else if (minutes.toString().length === 1) {
          minutes = `0${minutes}`;
        } else if (seconds.toString().length === 1) {
          seconds = `0${seconds}`;
        }
      }

      var hhmmss = hours + ':' + minutes + ':' + seconds;

      if (parseInt(hours) >= count) {
        detailsArr.push({
          equipment: data1[i].equipment,
          day: data1[i].day,
          duration: hhmmss,
        });
      }
    }
  }
  console.log(detailsArr);

  return (
    <>
      {detailsArr.length === 0 ? (
        <br></br>
      ) : (
        detailsArr.map((data) => (
          <div className='usageDetails'>
            <WarningAmberIcon style={{ fill: 'red' }} />
            <span key={data.toString()} className='ml-1'>
              <b>{data.equipment}</b> was not used for {data.duration} on{' '}
              <b>{data.day}</b> in between the equipment usages.
            </span>
          </div>
        ))
      )}
    </>
  );
}
