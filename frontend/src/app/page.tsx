import React from 'react';
import GradientBackground from './components/GradientBars';
import { Magnetic } from './components/MagneticButton';

export default function Page() {
	return (
		<GradientBackground
			numBars={9}
			gradientFrom="rgb(255, 60, 0)"
			gradientTo="transparent"
			animationDuration={2.5}
			backgroundColor="rgb(10, 10, 10)"
		>
			<div className="flex flex-col items-center gap-4 text-center">
			<h1 className="text-white text-6xl md:text-8xl font-extrabold tracking-tight">
				麦山云
			</h1>
					<p className="text-gray-200 text-sm md:text-lg">mai shan yun</p>

					{/* add extra vertical spacing between text and button */}
					<div className="mt-6">
						<Magnetic intensity={0.6} range={120} actionArea="self">
							<button
								style={{ backgroundColor: 'black' }}
								className="bg-black hover:bg-black active:bg-black text-white px-6 py-3 rounded-md shadow-md focus:outline-none flex items-center gap-2"
								aria-label="Go to Dashboard"
							>
								<span>Dashboard</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									className="w-4 h-4"
									aria-hidden="true"
								>
									<path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
								</svg>
							</button>
						</Magnetic>
					</div>
			</div>
		</GradientBackground>
	);
}
