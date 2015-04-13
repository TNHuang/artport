class EmailValidator < ActiveModel::EachValidator
	def validate_each(record, attribute, value)
		unless value =~ /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/
			record.errors[attribute] << ( options[:message] || "is invalid email")
		end
	end
end

class User < ActiveRecord::Base
	attr_reader :password

	validates :email, presence: true, email: true
	validates :username, :email, :password_digest, uniqueness: true,  presence: true

	validates :password, length: { minimum: 6, allow: nil}, confirmation: true,
			  :if => :password_digest_changed? 
			  #only validate if password_digest change

	validates_uniqueness_of :email, scope: [:username]
	has_many :sessions,	inverse_of: :user, dependent: :destroy

	# has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "http://i.imgur.com/2kr3TIL.jpg"
 #  	validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/


  	has_many :projects,
  	class_name: "Project",
  	foreign_key: :author_id,
  	dependent: :destroy
  	
	def full_name
		self.first_name + " " + self.last_name
	end

	def ==(other)
 		other.is_a?(User) && self.id == other.id
 	end

	def self.find_by_credential(params)
		user = User.find_by(username: params[:username])
		return user if user && user.is_password?(params[:password])
		nil
	end

	def password=(password)
		@password = password
		self.password_digest = BCrypt::Password.create(password)
	end

	def is_password?(password)
		BCrypt::Password.new(self.password_digest).is_password?(password)
	end

end
