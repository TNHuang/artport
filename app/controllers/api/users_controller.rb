class Api::UsersController < ApplicationController

  def index
    @users = User.all
    render :index
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in!(@user)
      render :show
    else
      render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render json: { message: "update success"}
    else
      render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    render json: {}
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :first_name, :last_name,
                                  :profession, :city, :country_state, :bio,
                                  :tag_list, :password, :password_confirmation)
  end

  def require_current_user
    if !signed_in? || User.find(params[:id]) != current_user
      render json: { error: "only signed in current user may peform this action" }, status: :forbidden
    end
  end
  
end
