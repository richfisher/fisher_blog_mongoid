require 'spec_helper'

describe Panel::NotesController do
  login_admin

  # This should return the minimal set of attributes required to create a valid
  # Note. As you add validations to Note, be sure to
  # update the return value of this method accordingly.
  def valid_attributes
    {}
  end

  describe "GET index" do
    it "assigns all notes as @notes" do
      note = Note.create! valid_attributes
      get :index, {}
      assigns(:notes).should eq([note])
    end
  end

  describe "GET show" do
    it "assigns the requested note as @note" do
      note = Note.create! valid_attributes
      get :show, {:id => note.to_param}
      assigns(:note).should eq(note)
    end
  end

  describe "GET new" do
    it "assigns a new note as @note" do
      get :new, {}
      assigns(:note).should be_a_new(Note)
    end
  end

  describe "GET edit" do
    it "assigns the requested note as @note" do
      note = Note.create! valid_attributes
      get :edit, {:id => note.to_param}
      assigns(:note).should eq(note)
    end
  end

  describe "POST create" do
    describe "with valid params" do
      it "creates a new Note" do
        expect {
          post :create, {:note => valid_attributes}
        }.to change(Note, :count).by(1)
      end

      it "assigns a newly created note as @note" do
        post :create, {:note => valid_attributes}
        assigns(:note).should be_a(Note)
        assigns(:note).should be_persisted
      end

      it "redirects to the created note" do
        post :create, {:note => valid_attributes}
        response.should redirect_to(panel_notes_path)
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved note as @note" do
        # Trigger the behavior that occurs when invalid params are submitted
        Note.any_instance.stub(:save).and_return(false)
        post :create, {:note => {}}
        assigns(:note).should be_a_new(Note)
      end

      it "re-renders the 'new' template" do
        # Trigger the behavior that occurs when invalid params are submitted
        Note.any_instance.stub(:save).and_return(false)
        post :create, {:note => {}}
        response.should render_template("new")
      end
    end
  end

  describe "PUT update" do
    describe "with valid params" do
      it "updates the requested note" do
        note = Note.create! valid_attributes
        # Assuming there are no other notes in the database, this
        # specifies that the Note created on the previous line
        # receives the :update_attributes message with whatever params are
        # submitted in the request.
        Note.any_instance.should_receive(:update_attributes).with({'these' => 'params'})
        put :update, {:id => note.to_param, :note => {'these' => 'params'}}
      end

      it "assigns the requested note as @note" do
        note = Note.create! valid_attributes
        put :update, {:id => note.to_param, :note => valid_attributes}
        assigns(:note).should eq(note)
      end

      it "redirects to the note" do
        note = Note.create! valid_attributes
        put :update, {:id => note.to_param, :note => valid_attributes}
        response.should redirect_to(panel_notes_path)
      end
    end

    describe "with invalid params" do
      it "assigns the note as @note" do
        note = Note.create! valid_attributes
        # Trigger the behavior that occurs when invalid params are submitted
        Note.any_instance.stub(:save).and_return(false)
        put :update, {:id => note.to_param, :note => {}}
        assigns(:note).should eq(note)
      end

      it "re-renders the 'edit' template" do
        note = Note.create! valid_attributes
        # Trigger the behavior that occurs when invalid params are submitted
        Note.any_instance.stub(:save).and_return(false)
        put :update, {:id => note.to_param, :note => {}}
        response.should render_template("edit")
      end
    end
  end

  describe "DELETE destroy" do
    it "destroys the requested note" do
      note = Note.create! valid_attributes
      expect {
        delete :destroy, {:id => note.to_param}
      }.to change(Note, :count).by(-1)
    end

    it "redirects to the notes list" do
      note = Note.create! valid_attributes
      delete :destroy, {:id => note.to_param}
      response.should redirect_to(panel_notes_path)
    end
  end

end
