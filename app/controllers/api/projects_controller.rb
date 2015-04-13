class Api::ProjectsController < ApplicationController
	def index
		@projects = Project.all
		render :index
	end
	def show
		@project = Project.find(params[:id]);
		render :show
	end
	def create
		@project = Project.new(project_params);
		if @project.save
			render json: {message: "create success"}
		else
			render json: {error: @project.errors.full_messages }, status: :unprocessable_entity
		end
	end
	def update
		@project = Project.find(params[:id]);
		if @project.update(project_params)
			render json: {message: "update success"}
		else
			render json: {error: @project.errors.full_messages}, status: :unprocessable_entity
		end
	end
	def destroy
		@project = Project.find(params[:id]).destroy
		render json: {message: "project destroy"}
	end

	def add_tag
		@project = Project.find(params[:id])
		@project.tag_list.add(project_params[:tag_list], parse: true)
		if @project.save
			render json: {tags: @project.tag_list.join(", ")}
		else
			render json: {error: @project.errors.full_messages}, status: :unprocessable_entity
		end
		
	end

	def remove_tag
		@project = Project.find(params[:id])
		@project.tag_list.remove(project_params[:tag_list], parse: true)
		if @project.save
			render json: {tags: @project.tag_list.join(", ")}
		else
			render json: {error: @project.errors.full_messages}, status: :unprocessable_entity
		end
	end

	def search_by_tag
		@projects = Project.tagged_with(project_params.split(','), :any => true)
		render :index
	end
	private
	def project_params
		params.require(:project).permit(:author_id, :search_terms, :tag_list, :project_name, :project_type, :project_url)
	end
end