const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '');

export const getProjects = async () => {
  const response = await fetch(`${API_BASE_URL}/projects/`);
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  return response.json();
};

export const getProject = async (slug) => {
  const response = await fetch(`${API_BASE_URL}/projects/${slug}/`);
  if (!response.ok) {
    throw new Error("Failed to fetch project");
  }
  return response.json();
};

export const getBlogPosts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/blog-posts/`);
    if (!response.ok) {
      throw new Error(`Failed to fetch blog posts: ${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Blog posts fetch error:', error);
    throw error;
  }
};

export const getBlogPost = async (slug) => {
  const response = await fetch(`${API_BASE_URL}/blog-posts/${slug}/`);
  if (!response.ok) {
    throw new Error("Failed to fetch blog post");
  }
  return response.json();
};
