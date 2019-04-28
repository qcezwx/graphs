import json
from itertools import chain
import time

import petya
#import serj


METHODS = {
    'brute': petya.optgraph_brute,
    'simple_greedy': petya.optgraph_simple_greedy,
    'spath_greedy': petya.optgraph_spath_greedy,
    'simple_grasp': petya.optgraph_simple_grasp,
    'spath_grasp': petya.optgraph_spath_grasp,
}


def color_graph(graph, edges):
    """

    :param graph:
    :param edges:
    :return:
    """

    colored_graph = graph.copy()

    active_nodes = chain(*edges)
    for node in colored_graph['nodes']:
        node['color'] = 'green' if node['nodeId'] in active_nodes else 'red'

    sorted_edges = list(map(sorted, edges))
    for edge in colored_graph['links']:
        edge['color'] = ('blue' if sorted((edge['nodeId1'], edge['nodeId2']))
                         in sorted_edges else 'black')

    return colored_graph


def sasha(query, context):
    """
    query = {
        'graph': {
            'nodes': [{'nodeId': int, 'weight': float}]
            'links': [{'nodeId1': int, 'nodeId2': int, 'weight': float}]
            }
        'method': {'name': str, 'params': {}}
    }

    :param query:
    :return:
    """

    # query = json.loads(query)

    edges = [(edge['nodeId1'], edge['nodeId2'], edge['weight']) for edge in query['graph']['links']]
    nodes = {node['nodeId']: node['weight'] for node in query['graph']['nodes']}
    weights = [nodes[idx] for idx in sorted(nodes)]

    if query['method']['name'] not in METHODS.keys():
        raise ValueError('Invalid method\'s name')
    method = METHODS.get(query['method']['name'])
    params = query['method'].get('params')

    start_time = time.time()
    result_edges = method(edges, weights, **params)
    method_time = time.time() - start_time

    colored_graph = color_graph(query['graph'], result_edges)

    result = {
        'graph': colored_graph,
        'time': method_time
    }
    return json.dumps(result)

    # result1 = method(links, weights, **params)
    # res_tmp = serj.make_new_graph(src_graph, result1, src_graph.vs["weight"])
    #
    # res_graph_1 = src_graph.copy()
    # res_sums = serj.paint_src(res_graph_1, res_tmp)