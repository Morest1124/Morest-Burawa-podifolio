const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'https://binaryblade24.pythonanywhere.com/api';

console.log('API_BASE_URL:', API_BASE_URL);

export const getProjects = async () => {
  try {
    const url = `${API_BASE_URL}/projects/`;
    console.log('Fetching projects from:', url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Projects fetch error:', error);
    throw error;
  }
};

export const getProject = async (slug) => {
  try {
    const url = `${API_BASE_URL}/projects/${slug}/`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch project: ${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Project fetch error:', error);
    throw error;
  }
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
  try {
    const url = `${API_BASE_URL}/blog-posts/${slug}/`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch blog post: ${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Blog post fetch error:', error);
    throw error;
  }
};
