import useSvg from "../hooks/useSvg";
import React from "react";

export const Svg = (props) => {
	const { draw, options, style, ...otherProps } = props;

	const svgRef = useSvg(draw);

	return <svg ref={svgRef} {...otherProps} style={{ ...style }} />;
};
