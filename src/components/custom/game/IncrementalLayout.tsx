import IncrementalBase from './IncrementalBase';

const IncrementalLayout = () => {
	return (
		<>
			<div className="font-incremental grid grid-rows-2 grid-cols-5 gap-0 text-2xl justify-items-center">
				<div className="grid-rows-1 col-span-5">Idle Game</div>
				<div className="grid-rows-2 col-span-1" />
				<div className="grid-rows-2 col-span-3">{<IncrementalBase />}</div>
				<div className="grid-rows-2 col-span-1" />
			</div>
		</>
	);
};

export default IncrementalLayout;
