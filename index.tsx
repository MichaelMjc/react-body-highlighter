import React, { useCallback } from "react";
import { differenceWith } from "ramda";

import { bodyFront } from "./assets/bodyFront";
import { bodyBack } from "./assets/bodyBack";
import { SvgMaleWrapper } from "./components/SvgMaleWrapper";
import { bodyFemaleFront } from "./assets/bodyFemaleFront";
import { bodyFemaleBack } from "./assets/bodyFemaleBack";
import { SvgFemaleWrapper } from "./components/SvgFemaleWrapper";
import { defaultBorder, defaultColor } from "./utils";

export type Slug =
	| "abs"
	| "adductors"
	| "ankles"
	| "biceps"
	| "calves"
	| "chest"
	| "deltoids"
	| "deltoids"
	| "feet"
	| "forearm"
	| "gluteal"
	| "hamstring"
	| "hands"
	| "hair"
	| "head"
	| "knees"
	| "lower-back"
	| "neck"
	| "obliques"
	| "quadriceps"
	| "tibialis"
	| "trapezius"
	| "triceps"
	| "upper-back";

export interface BodyPart {
	color?: string;
	slug?: Slug;
	path?: {
		common?: string[];
		left?: string[];
		right?: string[];
	};
}

export interface ExtendedBodyPart extends BodyPart {
	intensity?: number;
	leftSideIntensity?: number;
	rightSideIntensity?: number;
	side?: "left" | "right";
}

export type BodyProps = {
	colors?: ReadonlyArray<string>;
	data: ReadonlyArray<ExtendedBodyPart>;
	scale?: number;
	side?: "front" | "back";
	gender?: "male" | "female";
	onBodyPartClick?: (b: ExtendedBodyPart, side?: "left" | "right") => void;
	border?: string | "none";
};

const comparison = (a: ExtendedBodyPart, b: ExtendedBodyPart) =>
	a.slug === b.slug;

const Body = ({
	colors = ["#0984e3", "#74b9ff"],
	data,
	scale = 1,
	side = "front",
	gender = "male",
	onBodyPartClick,
	border = defaultBorder,
}: BodyProps) => {
	const mergedBodyParts = useCallback(
		(dataSource: ReadonlyArray<BodyPart>) => {
			const innerData = data
				.map((d) => {
					let foundedBodyPart = dataSource.find((e) => e.slug === d.slug);
					return {
						...foundedBodyPart,
						leftSideIntensity: d.leftSideIntensity,
						rightSideIntensity: d.rightSideIntensity,
					};
				})
				.filter(Boolean);

			const coloredBodyParts = innerData.map((d) => {
				const bodyPart = data.find((e) => e.slug === d?.slug);
				let colorIntensity = 1;
				if (bodyPart?.intensity) colorIntensity = bodyPart.intensity;
				return { ...d, color: colors[colorIntensity - 1] };
			});

			const formattedBodyParts = differenceWith(comparison, dataSource, data);

			return [...formattedBodyParts, ...coloredBodyParts];
		},
		[data, colors]
	);

	const getColorToFill = (
		bodyPart: ExtendedBodyPart,
		side?: "left" | "right"
	) => {
		let color;

		if (bodyPart.leftSideIntensity && side === "left") {
			color = colors[bodyPart.leftSideIntensity - 1];
		} else if (bodyPart.rightSideIntensity && side === "right") {
			color = colors[bodyPart.rightSideIntensity - 1];
		} else if (bodyPart.intensity) {
			color = colors[bodyPart.intensity];
		} else {
			color = bodyPart.color;
		}

		return color;
	};

	const renderBodySvg = (bodyToRender: ReadonlyArray<BodyPart>) => {
		const SvgWrapper = gender === "male" ? SvgMaleWrapper : SvgFemaleWrapper;

		return (
			<SvgWrapper side={side} scale={scale} border={border}>
				{mergedBodyParts(bodyToRender).map((bodyPart: ExtendedBodyPart) => {
					const commonPaths = (bodyPart.path?.common || []).map((path) => {
						const dataCommonPath = data.find((d) => d.slug === bodyPart.slug)
							?.path?.common;

						return (
							<path
								style={{
									cursor: "pointer",
								}}
								key={path}
								onClick={() => onBodyPartClick?.(bodyPart)}
								id={bodyPart.slug}
								fill={
									dataCommonPath ? getColorToFill(bodyPart) : bodyPart.color
								}
								d={path}
							/>
						);
					});

					const leftPaths = (bodyPart.path?.left || []).map((path) => {
						const isOnlyRight =
							data.find((d) => d.slug === bodyPart.slug)?.side === "right";

						return (
							<path
								style={{
									cursor: "pointer",
								}}
								key={path}
								onClick={() => onBodyPartClick?.(bodyPart, "left")}
								id={bodyPart.slug}
								fill={
									isOnlyRight ? defaultColor : getColorToFill(bodyPart, "left")
								}
								d={path}
							/>
						);
					});
					const rightPaths = (bodyPart.path?.right || []).map((path) => {
						const isOnlyLeft =
							data.find((d) => d.slug === bodyPart.slug)?.side === "left";

						return (
							<path
								style={{
									cursor: "pointer",
								}}
								key={path}
								onClick={() => onBodyPartClick?.(bodyPart, "right")}
								id={bodyPart.slug}
								fill={
									isOnlyLeft ? defaultColor : getColorToFill(bodyPart, "right")
								}
								d={path}
							/>
						);
					});

					return [...commonPaths, ...leftPaths, ...rightPaths];
				})}
			</SvgWrapper>
		);
	};

	if (gender === "female") {
		return renderBodySvg(side === "front" ? bodyFemaleFront : bodyFemaleBack);
	}

	return renderBodySvg(side === "front" ? bodyFront : bodyBack);
};

export default Body;
