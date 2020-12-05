import { TreeNode } from './tree-node';

/**
 * Represents the tree structure as a flat hierarchy of paths
 */
export interface FlatTreeStruct {

  /**
   * The direct child nodes of every path with children in the tree structure
   */
  [path: string]: TreeNode[];
}