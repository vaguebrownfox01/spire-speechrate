import React from "react";
import { Svg } from "./Svg";
import * as d3 from "d3";
import { axisRadialInner } from "../utils/axis";

import "../styles/gauge.css";

const Gauge = ({ value }) => {
	function deg2rad(deg) {
		return (deg * Math.PI) / 180;
	}

	async function draw(svgRef) {
		const r = 200;
		const EXTRA_ANGLE = 10;
		const whRatio = 2 / (Math.sin(deg2rad(EXTRA_ANGLE)) + 1.1);
		const angleScale = d3
			.scaleLinear()
			.domain([0, 500])
			.range([-90 - EXTRA_ANGLE, 90 + EXTRA_ANGLE]);

		const svg = d3
			.select(svgRef)
			.attr("width", r * 2)
			.attr("height", (r * 2) / whRatio)
			.attr("viewBox", [-r, -r, r * 2, (r * 2) / whRatio]);

		// clear previous render
		svg.selectAll("*").remove();

		// Add val label
		const label = svg
			.append("text")
			.classed("label", true)
			.attr("x", 0)
			.attr("y", r * -0.2)
			.attr("text-anchor", "middle")
			.text("0 Hz");

		// Add needle
		const needle = svg
			.append("g")
			.attr("transform", `scale(${r * 0.85})`)
			.append("path")
			.classed("needle", true)
			.attr(
				"d",
				["M0 -1", "L0.03 0", "A 0.03 0.03 0 0 1 -0.03 0", "Z"].join(" ")
			)
			.attr("transform", `rotate(${angleScale(0)})`);

		// Add axis
		svg.append("g")
			.classed("axis", true)
			.call(
				axisRadialInner(
					angleScale.copy().range(angleScale.range().map(deg2rad)),
					r - 5
				)
			);
		// const newVal = Math.round(Math.random() * 100);

		const newVal = parseInt(value);

		needle
			.transition()
			.duration(700)
			.ease(d3.easeElastic)
			.attr("transform", `rotate(${angleScale(newVal)})`);
		label.text(`${newVal} Hz`);
	}

	return (
		<Svg
			style={{
				height: "100%",
				width: "100%",
			}}
			draw={draw}
		/>
	);
};

export default Gauge;
