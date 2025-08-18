export function validateTaskPayload(body, { partial = false } = {}) {
  if (!partial) {
    if (!body || typeof body.title !== 'string' || body.title.trim().length === 0) {
      return { error: 'Title is required and must be a non-empty string' };
    }
  } else {
    if (body.title !== undefined && (typeof body.title !== 'string' || body.title.trim().length === 0)) {
      return { error: 'If provided, title must be a non-empty string' };
    }
    if (body.description !== undefined && typeof body.description !== 'string') {
      return { error: 'If provided, description must be a string' };
    }
    if (body.completed !== undefined && typeof body.completed !== 'boolean') {
      return { error: 'If provided, completed must be a boolean' };
    }
  }

  return { error: null };
}