interface EXP {
	label: string;
	imageSlug: string;
	jobTitle: string;
	jobDescription: string;
	companyName: string;

	startDate: Date;
	endDate: Date;
}

const Experience: Array<EXP> = [
	{
		label: 'exp-1',
		imageSlug: 'src/assets/roundry.png',
		jobTitle: 'SWE',
		jobDescription:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque id nibh tortor id aliquet lectus proin nibh nisl. Mi quis hendrerit dolor magna eget. Praesent semper feugiat nibh sed pulvinar. Enim neque volutpat ac tincidunt vitae semper quis lectus. Sed nisi lacus sed viverra tellus in hac. Pellentesque id nibh tortor id aliquet lectus proin nibh nisl. Congue nisi vitae suscipit tellus. Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Molestie at elementum eu facilisis sed odio. Pharetra magna ac placerat vestibulum lectus mauris ultrices eros in. Eget arcu dictum varius duis at consectetur lorem. Augue ut lectus arcu bibendum at varius vel pharetra. Egestas integer eget aliquet nibh praesent tristique.',
		companyName: 'Company',

		startDate: new Date('1/1/2000'),
		endDate: new Date('2/1/2010'),
	},
	{
		label: 'exp-2',
		imageSlug: 'src/assets/roundry.png',
		jobTitle: 'SWE-2',
		jobDescription:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque id nibh tortor id aliquet lectus proin nibh nisl. Mi quis hendrerit dolor magna eget. Praesent semper feugiat nibh sed pulvinar. Enim neque volutpat ac tincidunt vitae semper quis lectus. Sed nisi lacus sed viverra tellus in hac. Pellentesque id nibh tortor id aliquet lectus proin nibh nisl. Congue nisi vitae suscipit tellus. Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Molestie at elementum eu facilisis sed odio. Pharetra magna ac placerat vestibulum lectus mauris ultrices eros in. Eget arcu dictum varius duis at consectetur lorem. Augue ut lectus arcu bibendum at varius vel pharetra. Egestas integer eget aliquet nibh praesent tristique.',
		companyName: 'Company 2',

		startDate: new Date('1/1/2000'),
		endDate: new Date('2/1/2020'),
	},
];

export default Experience;
