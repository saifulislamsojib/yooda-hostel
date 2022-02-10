import { Button, Stack, Typography } from "@mui/material";
import React, { MouseEventHandler } from "react";

interface IProps {
  title: string;
  btnText?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const TopBar = ({ title, btnText, onClick }: IProps) => {
  return (
    <Stack
      sx={{ marginTop: 1 }}
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="h4" component="h1">
        {title}
      </Typography>
      {btnText && onClick && (
        <Button onClick={onClick} variant="contained">
          {btnText}
        </Button>
      )}
    </Stack>
  );
};

export default TopBar;
