require 'spec_helper'

describe Panel::PartnersController do
  login_admin

  def valid_attributes
    {}
  end

  describe "GET index" do
    it "assigns all partners as @partners" do
      partner = Partner.create! valid_attributes
      get :index, {}
      assigns(:partners).should eq([partner])
    end
  end

  describe "GET show" do
    it "assigns the requested partner as @partner" do
      partner = Partner.create! valid_attributes
      get :show, {:id => partner.to_param}
      assigns(:partner).should eq(partner)
    end
  end

  describe "GET new" do
    it "assigns a new partner as @partner" do
      get :new, {}
      assigns(:partner).should be_a_new(Partner)
    end
  end

  describe "GET edit" do
    it "assigns the requested partner as @partner" do
      partner = Partner.create! valid_attributes
      get :edit, {:id => partner.to_param}
      assigns(:partner).should eq(partner)
    end
  end

  describe "POST create" do
    describe "with valid params" do
      it "creates a new Partner" do
        expect {
          post :create, {:partner => valid_attributes}
        }.to change(Partner, :count).by(1)
      end

      it "assigns a newly created partner as @partner" do
        post :create, {:partner => valid_attributes}
        assigns(:partner).should be_a(Partner)
        assigns(:partner).should be_persisted
      end

      it "redirects to the created partner" do
        post :create, {:partner => valid_attributes}
        response.should redirect_to(panel_partners_path)
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved partner as @partner" do
        # Trigger the behavior that occurs when invalid params are submitted
        Partner.any_instance.stub(:save).and_return(false)
        post :create, {:partner => {}}
        assigns(:partner).should be_a_new(Partner)
      end

      it "re-renders the 'new' template" do
        # Trigger the behavior that occurs when invalid params are submitted
        Partner.any_instance.stub(:save).and_return(false)
        post :create, {:partner => {}}
        response.should render_template("new")
      end
    end
  end

  describe "PUT update" do
    describe "with valid params" do
      it "updates the requested partner" do
        partner = Partner.create! valid_attributes
        # Assuming there are no other partners in the database, this
        # specifies that the Partner created on the previous line
        # receives the :update_attributes message with whatever params are
        # submitted in the request.
        Partner.any_instance.should_receive(:update_attributes).with({'these' => 'params'})
        put :update, {:id => partner.to_param, :partner => {'these' => 'params'}}
      end

      it "assigns the requested partner as @partner" do
        partner = Partner.create! valid_attributes
        put :update, {:id => partner.to_param, :partner => valid_attributes}
        assigns(:partner).should eq(partner)
      end

      it "redirects to the partner" do
        partner = Partner.create! valid_attributes
        put :update, {:id => partner.to_param, :partner => valid_attributes}
        response.should redirect_to(panel_partners_path)
      end
    end

    describe "with invalid params" do
      it "assigns the partner as @partner" do
        partner = Partner.create! valid_attributes
        # Trigger the behavior that occurs when invalid params are submitted
        Partner.any_instance.stub(:save).and_return(false)
        put :update, {:id => partner.to_param, :partner => {}}
        assigns(:partner).should eq(partner)
      end

      it "re-renders the 'edit' template" do
        partner = Partner.create! valid_attributes
        # Trigger the behavior that occurs when invalid params are submitted
        Partner.any_instance.stub(:save).and_return(false)
        put :update, {:id => partner.to_param, :partner => {}}
        response.should render_template("edit")
      end
    end
  end

  describe "DELETE destroy" do
    it "destroys the requested partner" do
      partner = Partner.create! valid_attributes
      expect {
        delete :destroy, {:id => partner.to_param}
      }.to change(Partner, :count).by(-1)
    end

    it "redirects to the partners list" do
      partner = Partner.create! valid_attributes
      delete :destroy, {:id => partner.to_param}
      response.should redirect_to(panel_partners_url)
    end
  end

end
