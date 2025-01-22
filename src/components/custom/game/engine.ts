export class GameEngine {
	private resources: { [key: string]: number };
	private lastUpdate: number;
	constructor() {
		this.resources = { gold: 0 };
		this.lastUpdate = Date.now();
	}

	public getResource(resource: string): number {
		return this.resources[resource] || 0;
	}

	public update() {
		const now = Date.now();
		const deltaTime = now - this.lastUpdate;
		this.lastUpdate = now;

		this.resources.gold += deltaTime / 1000;
	}
}
