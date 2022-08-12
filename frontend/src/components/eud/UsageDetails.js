import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export function UsageDetails(data) {
  let data1 = data.data.data;

  return (
    <>
      {data1.length === 0 ? (
        <p>NO DATA</p>
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
