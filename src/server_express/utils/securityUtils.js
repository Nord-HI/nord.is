import path from 'path'

// Utility fuction to prevent directory traversal attacks
export const normalizePathSuffix = suffix => path.normalize(suffix).replace(/^(\.\.[\/\\])+/, '')
