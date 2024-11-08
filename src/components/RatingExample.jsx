import React, { useState } from 'react';
import { Rating } from '@mui/material';
import Typography from '@mui/material/Typography';

const RatingExample = () => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <Typography component="legend">Controlled</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <Typography component="legend">Read only</Typography>
      <Rating name="read-only" value={value} readOnly />
      <Typography component="legend">Disabled</Typography>
      <Rating name="disabled" value={value} disabled />
      <Typography component="legend">No rating given</Typography>
      <Rating name="no-value" value={null} />
    </div>
  );
};

export default RatingExample;