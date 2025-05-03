import React, { useState } from "react";
import "./App.css";
import Body, { ExtendedBodyPart } from "react-body-highlighter";

const Switch = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
	return (
		<label className="switch">
			<input type="checkbox" {...props} />
			<span className="slider round"></span>
		</label>
	);
};

const COLORS = ["#fee2e2", "#fca5a5", "#ef4444", "#b91c1c", "#7f1d1d"];

function App() {
	const [bodyParts, setBodyParts] = useState<ExtendedBodyPart[]>([]);
	const [side, setSide] = useState<"front" | "back">("front");
	const [gender, setGender] = useState<"male" | "female">("male");
	const [intensity, setIntensity] = useState(1);

	const handleBodyPartClick = (
		b: ExtendedBodyPart,
		side?: "left" | "right"
	) => {
		const bodyPartSelected = bodyParts.some((bp) => {
			return bp.slug === b.slug;
		});

		if (!side) {
			if (bodyPartSelected) {
				return setBodyParts((prevBodyParts) =>
					prevBodyParts.filter((bodyPart) => bodyPart.slug !== b.slug)
				);
			} else {
				return setBodyParts((prevBodyParts) => [
					...prevBodyParts,
					{ ...b, intensity },
				]);
			}
		} else {
			const bothSidesSelected = bodyParts.some((bp) => {
				return bp.slug === b.slug && bp.side === undefined;
			});
			const oppositeSideSelected = bodyParts.some((bp) => {
				return bp.slug === b.slug && bp.side !== undefined && bp.side !== side;
			});

			const bodyPartSideSelected = bodyParts.some((bp) => {
				return bp.slug === b.slug && bp.side === side;
			});

			if (oppositeSideSelected) {
				return setBodyParts((prevBodyParts) =>
					prevBodyParts.map((prevBodyPart) => {
						if (prevBodyPart.slug === b.slug) {
							return {
								...prevBodyPart,
								side: undefined,
							};
						}

						return prevBodyPart;
					})
				);
			}

			if (bothSidesSelected) {
				return setBodyParts((prevBodyParts) =>
					prevBodyParts.map((prevBodyPart) => {
						if (prevBodyPart.slug === b.slug) {
							return {
								...prevBodyPart,
								side: side === "left" ? "right" : "left",
							};
						}

						return prevBodyPart;
					})
				);
			}

			if (bodyPartSideSelected) {
				return setBodyParts((prevBodyParts) =>
					prevBodyParts.filter((bodyPart) => bodyPart.slug !== b.slug)
				);
			}

			if (!bodyPartSelected) {
				return setBodyParts((prevBodyParts) => [
					...prevBodyParts,
					{ ...b, side, intensity },
				]);
			}
		}
	};

	const handleIntensityClick = (intensity: number) => {
		setIntensity(intensity);

		setBodyParts((prevBodyParts) =>
			prevBodyParts.map((bodyPart) => ({ ...bodyPart, intensity }))
		);
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				gap: 16,
			}}
		>
			<Body
				side={side}
				colors={COLORS}
				gender={gender}
				data={bodyParts}
				onBodyPartClick={handleBodyPartClick}
			/>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					gap: 8,
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						position: "relative",
						width: 200,
					}}
				>
					<span
						style={{
							position: "absolute",
							left: 0,
						}}
					>
						Front
					</span>
					<Switch
						onChange={(e) => {
							if (e.target.checked) {
								setSide("back");
							} else {
								setSide("front");
							}
						}}
					/>
					<span
						style={{
							position: "absolute",
							right: 0,
						}}
					>
						Back
					</span>
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						position: "relative",
						width: 200,
						justifyContent: "center",
					}}
				>
					<span
						style={{
							position: "absolute",
							left: 0,
						}}
					>
						Male
					</span>
					<Switch
						onChange={(e) => {
							if (e.target.checked) {
								setGender("female");
							} else {
								setGender("male");
							}
						}}
					/>
					<span
						style={{
							position: "absolute",
							right: 0,
						}}
					>
						Female
					</span>
				</div>
			</div>
			<div
				style={{
					display: "flex",
					gap: 12,
				}}
			>
				{COLORS.map((color, colorIndex) => {
					return (
						<div
							onClick={() => handleIntensityClick(colorIndex + 1)}
							className={`intensity ${
								colorIndex + 1 === intensity ? "selected" : ""
							}`}
							key={color}
						>
							<div
								style={{
									backgroundColor: color,
								}}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
