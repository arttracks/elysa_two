module HeaderHelper
  def title_text
    title_text = nil
    if content_for? :title_text
      title_text = yield_content(:title_text) 
    else
      title_text = data["title"] if defined?(data) 
    end
    return [title_text].compact.join(" | ") 
  end
end