import { Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Gauge from "./Gauge";
import { setupAudio } from "../utils/setupAudio";

const PitchGauge = () => {
	const [btnTxt, setBtnTxt] = React.useState("Start Listening");

	const [audio, setAudio] = React.useState();
	const [context, setContext] = React.useState();
	const [running, setRunning] = React.useState(false);
	const [latestPitch, setLatestPitch] = React.useState(0);

	const handlePitchButton = async () => {
		if (!context) {
			setAudio(await setupAudio(setLatestPitch));
			setRunning(true);
			setBtnTxt("Pause");
			return;
		}

		if (running) {
			await context.suspend();
			setRunning(context.state === "running");
			setBtnTxt("Resume");
		} else {
			await context.resume();
			setRunning(context.state === "running");
			setBtnTxt("Pause");
		}
	};

	React.useEffect(() => {
		if (audio) {
			setContext(audio.context);
		}
	}, [audio]);

	return (
		<>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					pt: 8,
					mx: 4,
				}}
			>
				<Typography
					fontWeight="bold"
					textAlign="center"
					variant="h4"
					gutterBottom
					color="GrayText"
				>
					Pitch Gauge
				</Typography>
				<Paper
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						maxWidth: "24rem",
						mx: "auto",
						px: 4,
						py: 8,
					}}
					elevation={4}
				>
					<Gauge value={latestPitch} />
				</Paper>
				<Button
					sx={{
						mt: 2,
					}}
					variant="contained"
					onClick={handlePitchButton}
				>
					{btnTxt}
				</Button>
			</Box>
		</>
	);
};

export default PitchGauge;
