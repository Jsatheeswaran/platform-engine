import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { Task } from "../Entities/task.entity";
import { TaskService } from "../Services/task.service";

@Controller("management/tasks")
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Get(":limit/:page")
	async findAll(
		@Param("limit") limit: number,
		@Param("page") page: number,
		@Query("total") total: string
	): Promise<{ data: Task[]; total: number }> {
		// Validate page and limit values
		console.log("test");

		page = page > 0 ? page : page;
		limit = limit > 0 ? limit : limit;

		const result = await this.taskService.findAllPaginated(+total, page, limit);
		return {
			data: result.data,
			total: result.total,
		};
	}

	@Get(":id")
	async findOne(@Param("id") id: string): Promise<Task> {
		return this.taskService.findOne(id);
	}

	@Post()
	async create(@Body() task: Task): Promise<Task> {
		return this.taskService.create(task);
	}

	@Put(":id")
	async update(@Param("id") id: string, @Body() updatedTask: Partial<Task>): Promise<Task> {
		return this.taskService.update(id, updatedTask);
	}

	@Delete(":id")
	async remove(@Param("id") id: string): Promise<void> {
		return this.taskService.remove(id);
	}
}
