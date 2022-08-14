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
            <b>{data.recipe}</b> on {data.date}, {data.day}.
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
