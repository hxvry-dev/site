interface EXP {
	label: string;
	imageSlug: string;
	jobTitle: string;
	jobDescription: string;
	companyName: string;

	startDate?: Date;
	endDate?: Date;
}

const Experience: Array<EXP> = [
	{
		label: 'exp-1',
		imageSlug: 'src/assets/roundry.png',
		jobTitle: 'SWE',
		jobDescription: 'Software Engineer',
		companyName: 'Company',

		startDate: new Date('1/1/2000'),
		endDate: new Date('2/1/2010'),
	},
];

export default Experience;
