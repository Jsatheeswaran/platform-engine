// src/management/services/task.service.ts

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { Task } from "../Entities/task.entity";

@Injectable()
export class TaskService {
	constructor(
		@InjectRepository(Task)
		private readonly taskRepository: Repository<Task>
	) {}

	async findAll(): Promise<Task[]> {
		return this.taskRepository.find();
	}

	async findOne(taskId: string): Promise<Task> {
		const options: FindOneOptions<Task> = { where: { taskId } };
		const task = await this.taskRepository.findOne(options);

		if (!task) {
			throw new NotFoundException(`Task with ID ${taskId} not found`);
		}

		return task;
	}

	async create(task: Task): Promise<Task> {
		return this.taskRepository.save(task);
	}

	async update(taskId: string, updatedTask: Partial<Task>): Promise<Task> {
		await this.taskRepository.update(taskId, updatedTask);
		return this.findOne(taskId); // Utilize the findOne method to return the updated task
	}

	async remove(taskId: string): Promise<void> {
		const task = await this.findOne(taskId); // Utilize the findOne method to check if the task exists
		await this.taskRepository.remove(task);
	}
	async findAllPaginated(total: number, page: number, limit: number): Promise<{ data: Task[]; total: number }> {
		const [data, totalItems] = await this.taskRepository.findAndCount({
			skip: (page - 1) * limit,
			take: limit,
		});
		return {
			data,
			total: totalItems,
		};
	}
}
