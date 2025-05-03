# @mjcdev/react-body-highlighter

[![npm](https://img.shields.io/npm/v/react-native-body-highlighter.svg)](https://www.npmjs.com/package/react-native-body-highlighter) [![Downloads](https://img.shields.io/npm/dt/react-native-body-highlighter.svg)](https://www.npmjs.com/package/react-native-body-highlighter)

> Based on the work of [HichamELBSI](https://github.com/HichamELBSI) and their [react-native-body-highlighter library](https://github.com/HichamELBSI/react-native-body-highlighter), this project ports the SVG human body part highlighting functionality to standard React.

<div style="text-align:center;width:100%;">
  <img src="https://github.com/MichaelMjc/react-body-highlighter/blob/main/docs/screenshots/example-female-front.PNG" width="150" alt="body-highlighter" />
  <img src="https://github.com/MichaelMjc/react-body-highlighter/blob/main/docs/screenshots/example-female-back.PNG" width="150" alt="body-highlighter" />
  <img src="https://github.com/MichaelMjc/react-body-highlighter/blob/main/docs/screenshots/example-male-front.PNG" width="150" alt="body-highlighter" />
  <img src="https://github.com/MichaelMjc/react-body-highlighter/blob/main/docs/screenshots/example-male-back.PNG" width="150" alt="body-highlighter" />
</div>

## Installation

npm

```bash
$ npm install @mjcdev/react-body-highlighter
```

yarn

```bash
$ yarn add @mjcdev/react-body-highlighter
```

pnpm

```bash
$ pnpm add @mjcdev/react-body-highlighter
```

## Usage

### Basic example

```jsx
import { useState } from "react";
import Body from "react-body-highlighter";

export default function App() {
	return (
		<Body
			data={[
				{ slug: "chest", intensity: 1, side: "left" },
				{ slug: "biceps", intensity: 2 },
			]}
			gender="female"
			side="front"
			scale={1.7}
			border="#dfdfdf"
		/>
	);
}
```

<details>
<summary style="font-size:18px; font-weight: bold;">Complete example</summary>
<p>

```jsx
import React, { useState } from "react";
import Body, { ExtendedBodyPart } from "react-body-highlighter";

const Switch = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
	return (
		<label className="switch">
			<input type="checkbox" {...props} />
			<span className="slider round"></span>
		</label>
	);
};

export default function App() {
	const [selectedBodyPart, setSelectedBodyPart] =
		useState <
		ExtendedBodyPart >
		{
			slug: "biceps",
			intensity: 2,
			side: "right",
		};
	const [side, setSide] = (useState < "back") | ("front" > "front");
	const [gender, setGender] = (useState < "male") | ("female" > "male");

	const sideSwitch = () =>
		setSide((previousState) => (previousState === "front" ? "back" : "front"));

	const toggleGenderSwitch = () => {
		setGender((previousState) =>
			previousState === "male" ? "female" : "male"
		);
	};

	return (
			<Body
				data={[
					{ slug: "chest", intensity: 1, side: "left" },
					{ slug: "biceps", intensity: 1 },
					selectedBodyPart,
				]}
				onBodyPartClick={(e, side) =>
					setSelectedBodyPart({ slug: e.slug, intensity: 2, side })
				}
				gender={gender}
				side={side}
				scale={1.7}
				border="#dfdfdf"
			/>
			<div>
				<div>
					<p>Side ({side})</p>
					<Switch onChange={(e) => {
							if (e.target.checked) {
								setSide("back");
							} else {
								setSide("front");
							}
						}}  />
				</div>
				<div>
					<p>Gender ({gender})</p>
					<Switch
						onChange={(e) => {
							if (e.target.checked) {
								setGender("female");
							} else {
								setGender("male");
							}
						}}
					/>
				</div>
			</div>
	);
}
```

</p>
</details>

## Props

| Prop            | Required | Purpose                                                                                                       |
| --------------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| data            | Yes      | `BodyPartObject[]` - Array of `BodyPartObject` to highlight                                                   |
| onBodyPartClick | No       | `Func` - `(bodyPart: BodyPartObject, side?: left \| right) => {}` Callback called when a user tap a body part |
| colors          | No       | `string[]` - Defaults to `['#0984e3', '#74b9ff']`                                                             |
| side            | No       | `front \| back` - Defaults to `front`                                                                         |
| gender          | No       | `string` - Can be "male" or "female", Defaults to `male`                                                      |
| scale           | No       | `number` - Defaults to `1`                                                                                    |
| border          | No       | `string` - Defaults to `#dfdfdf` (`none` to hide the border)                                                  |

## BodyPart object model

- #### BodyPartObject: `{ slug: BodyPartName, intensity: IntensityNumber, side?: 'left' | 'right', leftSideIntensity?:IntensityNumber, rightSideIntensity?:IntensityNumber }`

- #### BodyPartName: Body part name to highlight (See the list of available body parts below)

- #### IntensityNumber: Color intensity (if the `colors` property is set: from 1 to `colors.length` + 1. If not, intensity can be 1 or 2)

- #### Side (optional): Can be `left`, `right`. Useful for selecting a single part or a pair (Do not set the side if you need to select the pair)

## List of body parts

| BodyParts    | Side                         |
| ------------ | ---------------------------- |
| trapezius    | Both                         |
| triceps      | Both                         |
| forearm      | Both                         |
| adductors    | Both                         |
| calves       | Both                         |
| hair         | Both                         |
| neck         | Both                         |
| deltoids     | Both                         |
| hands        | Both                         |
| feet         | Both                         |
| head         | Both (Front only for female) |
| ankles       | Both (Front only for female) |
| tibialis     | Front                        |
| obliques     | Front                        |
| chest        | Front                        |
| biceps       | Front                        |
| abs          | Front                        |
| quadriceps   | Front                        |
| knees        | Front                        |
| upper-back   | Back                         |
| lower-back   | Back                         |
| hamstring    | Back                         |
| gluteal      | Back                         |
